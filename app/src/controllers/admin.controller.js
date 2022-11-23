import admin from "../views/admin.html";
import { getPlans } from "../functions/methods/getPlans";
import { deletePlan } from "../functions/methods/deletePlan";
import { renderPlans } from "../functions/renderPlans";
import { renderPlansCreationForm } from "../functions/renderPlansCreationForm";
import { createPlan } from "../functions/methods/createPlan";
import "../views/admin.scss";

//selector for loader
const loader = document.getElementById("spinner");

export default async () => {
  //turns off loader
  loader.style.display = "none";

  const divElement = document.createElement("div");
  divElement.innerHTML = admin;

  //selectors
  const renderedAdminPlans = divElement.querySelector("#renderedAdminPlans");
  const planCreationButton = divElement.querySelector("#planCreationButton");
  const planCreationForm = divElement.querySelector("#planCreationForm");

  //load plans
  const plans = await getPlans(loader);
  const renderedResults = renderPlans(plans);

  renderedAdminPlans.innerHTML = renderedResults;

  const deletePlanSelector = divElement.querySelectorAll('[name="deletePlan"]');

  //event listeners for the admin view
  planCreationButton.addEventListener("click", async (event) => {
    const display = planCreationForm.style.display;
    if (display == "block") {
      //styles for the plan creation dropdown
      planCreationButton.classList.add("createPlanButton");
      planCreationButton.classList.remove("createPlanButtonOpen");
      planCreationButton.innerHTML = "CLICK TO OPEN THE PLAN CREATION FORM";

      planCreationForm.style.display = "none";
    } else {
      const createPlanForm = renderPlansCreationForm();
      planCreationButton.innerHTML = "CLICK TO CLOSE THE PLAN CREATION FORM";

      planCreationButton.classList.remove("createPlanButton");
      planCreationButton.classList.add("createPlanButtonOpen");
      planCreationForm.innerHTML = createPlanForm;

      //selectors for the plan creation form
      const carrierInput = divElement.querySelector("#carrierInput");
      const planInput = divElement.querySelector("#planInput");
      const stateInput = divElement.querySelector("#stateInput");
      const monthInput = divElement.querySelector("#monthInput");
      const ageMinInput = divElement.querySelector("#ageMinInput");
      const ageMaxInput = divElement.querySelector("#ageMaxInput");
      const premiumInput = divElement.querySelector("#premiumInput");
      const createPlanbutton = divElement.querySelector("#createPlan");

      const allSelectors = [
        carrierInput,
        planInput,
        stateInput,
        monthInput,
        premiumInput,
      ];

      //listeners to validate the plan creation form fields
      ageMinInput.addEventListener("input", (event) => {
        ageMaxInput.setAttribute("min", event.target.value);
      });

      ageMaxInput.addEventListener("input", (event) => {
        ageMinInput.setAttribute("max", event.target.value);
      });

      allSelectors.forEach((inputField) => {
        inputField.addEventListener("input", (event) => {
          const emptyFields = allSelectors.filter(
            (selectors) => !selectors.value
          );
          if (!emptyFields.length) {
            createPlanbutton.disabled = false;
          } else {
            createPlanbutton.disabled = true;
          }
        });
      });

      createPlanbutton.addEventListener("click", async (event) => {
        const emptyFields = allSelectors.filter(
          (selectors) => !selectors.value
        );

        if (emptyFields.length) {
          return;
        }

        //payload from ticket creation form
        const payload = {
          data: {
            id: Date.now(),
            carrier: carrierInput.value,
            plan: planInput.value,
            state: stateInput.value,
            monthOfBirth: monthInput.value,
            ageRangeMin: ageMinInput.value,
            ageRangeMax: ageMaxInput.value,
            premium: premiumInput.value,
          },
        };
        await createPlan(payload, loader).then(function (e) {
          alert("Plan created");

          setTimeout(() => {
            loader.style.display = "none";
            window.location.reload();
          }, 1000);
        });
      });
      planCreationForm.style.display = "block";
    }
  });

  deletePlanSelector.forEach((deleteHandler) => {
    deleteHandler.addEventListener("click", async (event) => {
      if (
        confirm(
          "Are you sure you want to delete this plan?. This action is irreversible"
        )
      ) {
        await deletePlan(event.target.value, loader).then(function (e) {
          alert("Plan deleted");

          setTimeout(() => {
            loader.style.display = "none";
            window.location.reload();
          }, 1000);
        });
      } else {
        alert("Not deleted");
      }
    });
  });

  return divElement;
};
