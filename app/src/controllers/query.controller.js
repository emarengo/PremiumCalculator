import query from "../views/query.html";
import "../views/query.scss";
import { birthdayToAge } from "../functions/birthdayToAge";
import { ageToBirthday } from "../functions/ageToBirthday";
import { request } from "../functions/request";
import { getPlans } from "../functions/getPlans";
import { renderResults } from "../functions/renderResults";

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
    return ` <option value="${p}">${p}</option>`;
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
  let allStatesAreNeeded = false;
  const state = [
    ...new Set(
      rawPlans.map((rawPlan) => {
        if (rawPlan.state == "*") {
          allStatesAreNeeded = true;
          return;
        }
        return rawPlan.state;
      })
    ),
  ];
  const stateOptions = state.sort().map((p) => {
    return ` <option value="${p}">${p}</option>`;
  });

  if (allStatesAreNeeded) {
    return `<select name="state">
     <option value="" selected disabled>Select a state</option>
        <option value="AL">AL</option>
        <option value="AK">AK</option>
        <option value="AZ">AZ</option>
        <option value="AR">AR</option>
        <option value="CA">CA</option>
        <option value="CO">CO</option>
        <option value="CT">CT</option>
        <option value="DE">DE</option>
        <option value="DC">DC</option>
        <option value="FL">FL</option>
        <option value="GA">GA</option>
        <option value="HI">HI</option>
        <option value="ID">ID</option>
        <option value="IL">IL</option>
        <option value="IN">IN</option>
        <option value="IA">IA</option>
        <option value="KS">KS</option>
        <option value="KY">KY</option>
        <option value="LA">LA</option>
        <option value="ME">ME</option>
        <option value="MD">MD</option>
        <option value="MA">MA</option>
        <option value="MI">MI</option>
        <option value="MN">MN</option>
        <option value="MS">MS</option>
        <option value="MO">MO</option>
        <option value="MT">MT</option>
        <option value="NE">NE</option>
        <option value="NV">NV</option>
        <option value="NH">NH</option>
        <option value="NJ">NJ</option>
        <option value="NM">NM</option>
        <option value="NY">NY</option>
        <option value="NC">NC</option>
        <option value="ND">ND</option>
        <option value="OH">OH</option>
        <option value="OK">OK</option>
        <option value="OR">OR</option>
        <option value="PA">PA</option>
        <option value="RI">RI</option>
        <option value="SC">SC</option>
        <option value="SD">SD</option>
        <option value="TN">TN</option>
        <option value="TX">TX</option>
        <option value="UT">UT</option>
        <option value="VT">VT</option>
        <option value="VA">VA</option>
        <option value="WA">WA</option>
        <option value="WV">WV</option>
        <option value="WI">WI</option>
        <option value="WY">WY</option>
</select>`;
  }

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

  statesDropdown.addEventListener("change", (event) => {
    statesDropdown.value = event.target.value;
    enableSubmitButton();
  });

  ageInput.addEventListener("input", (event) => {
    birthdateInput.value = `${ageToBirthday(event.target.value)}-01-01`;

    enableSubmitButton();
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
      alertBox.innerHTML = `<div class="alert">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>No results found!</strong> ${String(requestResult).substring(6)}
      </div>`;
      return;
    }
    queryForm.classList.add("hidden");
    queryResult.classList.remove("hidden");
    alertBox.style.display = "none"

    const renderedResults = renderResults(requestResult)

    resultLength.innerHTML = requestResult.length
    resultSection.innerHTML = renderedResults
});

  plansDropdown.innerHTML = renderedPlansDrowpdown;
  statesDropdown.innerHTML = renderedStateDrowpdown;

  return divElement;
};
