import query from "../views/query.html";
import "../views/query.scss";
import { birthdayToAge } from "../functions/birthdayToAge";
import { ageToBirthday } from "../functions/ageToBirthday";
import { request } from "../functions/methods/request";
import { getPlans } from "../functions/methods/getPlans";
import { renderResults } from "../functions/renderResults";
import { usaStatesOptions } from "../functions/usaStatesOptions";

const loader = document.getElementById("spinner");

const renderPlans = (rawPlans) => {
  const plans = [
    ...new Set(
      rawPlans.map((rawPlan) => {
        return rawPlan.plan;
      })
    ),
  ];
  const plansOptions = plans.sort().map((p) => {
    return ` <option value="${p}">${p == "*" ? "All plans" : p}</option>`;
  });

  return `
      <select name="plan" id="plan">
      <option value="" selected disabled>Select a Plan</option>
    ${plansOptions}
    </select>
    <label for="plan">Plans</label>
   `;
};

const renderStates = (rawPlans) => {
  const state = [
    ...new Set(
      rawPlans.map((rawPlan) => {
    
        return rawPlan.state;
      })
    ),
  ];

  const stateOptions = state.sort().map((p) => {
    return ` <option value="${p}">${p == "*" ? "All states" : p}</option>`;
  });

  return `
      <select name="state" id="state">
      <option value="" selected disabled>Select a state</option>
      ${stateOptions}
      </select>
    <label for="state">States</label>
  `;
};

export default async () => {
  loader.style.display = "block";

  const rawPlans = await getPlans(loader);

  const divElement = document.createElement("div");

  //return if there aren't plans available
  if (!rawPlans.length) {
    divElement.innerHTML =
      "<div class='query-form'><p>Currently there aren't plans available. Please create some.</p></div>";
    return divElement;
  }

  divElement.innerHTML = query;

  //Query view selectors
  const queryForm = divElement.querySelector("#queryForm");
  const queryResult = divElement.querySelector("#queryResult");
  const alertBox = document.getElementById("alertBox");
  const resultSection = divElement.querySelector("#resultSection");
  const resultLength = divElement.querySelector("#resultLength");
  const periodDropdown = divElement.querySelector("#period");
  const requestAgain = divElement.querySelector("#requestAgain");

  const birthdateInput = divElement.querySelector("#birthdate");
  const plansDropdown = divElement.querySelector("#plans");
  const statesDropdown = divElement.querySelector("#state");
  const ageInput = divElement.querySelector("#age");
  const submitButton = divElement.querySelector("#submitButton");

  const enableSubmitButton = () => {
    const fieldValues = [
      birthdateInput.value,
      plansDropdown.value,
      statesDropdown.value,
      ageInput.value,
    ];
    const emptyFields = fieldValues.filter((value) => !value);

    if (!emptyFields.length) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  };

  const renderedPlansDrowpdown = renderPlans(rawPlans);
  const renderedStateDrowpdown = renderStates(rawPlans);

  //event listeners
  birthdateInput.addEventListener("change", (event) => {
    ageInput.value = birthdayToAge(event.target.value);
    enableSubmitButton();
  });

  plansDropdown.addEventListener("change", (event) => {
    plansDropdown.value = event.target.value;
    enableSubmitButton();
  });

  requestAgain.addEventListener("click", (event) => {
    birthdateInput.value = "";
    ageInput.value = "";
    submitButton.disabled = true;

    queryForm.classList.remove("hidden");
    queryResult.classList.add("hidden");
  });

  statesDropdown.addEventListener("change", (event) => {
    statesDropdown.value = event.target.value;
    enableSubmitButton();
  });

  ageInput.addEventListener("input", (event) => {
    birthdateInput.value = `${ageToBirthday(event.target.value)}-01-01`;

    enableSubmitButton();
  });

  periodDropdown.addEventListener("change", (event) => {
    const resultFieldPremium = divElement.querySelectorAll(
      '[name="result-field-premium"]'
    );
    const resultFieldMonthly = divElement.querySelectorAll(
      '[name="result-field-monthly"]'
    );
    const resultFieldAnnual = divElement.querySelectorAll(
      '[name="result-field-annual"]'
    );

    resultFieldPremium.forEach((field, index) => {
      resultFieldMonthly[index].value = field.value * event.target.value;
      resultFieldAnnual[index].value = field.value * 12 * event.target.value;
    });
  });

  ageInput.oninput = function () {
    if (this.value > 150) {
      this.value = this.value.slice(0, 2);
      birthdateInput.value = `${ageToBirthday(this.value.slice(0, 2))}-01-01`;
    }
  };

  birthdateInput.max = new Date().toISOString().split("T")[0];

  submitButton.addEventListener("click", async () => {
    var raw = JSON.stringify({
      data: {
        dateOfBirth: birthdateInput.value,
        state: statesDropdown.value,
        plan: plansDropdown.value,
        age: ageInput.value,
      },
    });

    const requestResult = await request(raw, loader);
    if (!requestResult[0]) {
      alertBox.style.display = "block";
      alertBox.innerHTML = `<div class="alert">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>No results found!</strong> ${String(requestResult).substring(6)}
      </div>`;
      return;
    }
    queryForm.classList.add("hidden");
    queryResult.classList.remove("hidden");
    alertBox.style.display = "none";

    const renderedResults = renderResults(requestResult);

    resultLength.innerHTML = requestResult.length;
    resultSection.innerHTML = renderedResults;
  });

  plansDropdown.innerHTML = renderedPlansDrowpdown;
  statesDropdown.innerHTML = renderedStateDrowpdown;

  return divElement;
};
