import { usaStatesOptions } from "../functions/usaStatesOptions";
import { allMonthsOptions } from "../functions/allMonthsOptions";
export function renderPlansCreationForm() {
  return `
  <p>All fields are required. The button is disabled until the criteria is meet.</p>

    <div class="planCreationContainer">
        <div class="planCreationItem">
        <input type="text" id="carrierInput" required>
        <label for="carrierInput">Carrier</label>
        </div>
        <div class="planCreationItem">
        <input type="text" id="planInput" required>
        <label for="planInput">Plan</label>
        </div> 
        <div class="planCreationItem">
        <select name="stateInput" id="stateInput">
        <option value="" selected disabled>Choose</option>
        <option value="*">All States</option>
        ${usaStatesOptions}
        </select>
        <label for="stateInput">State</label>
        </div>
        <div class="planCreationItem">
        <select name="monthInput" id="monthInput">
        <option value="" selected disabled>Choose</option>
        ${allMonthsOptions}
        </select>
        <label for="monthInput">Month</label>
        </div>
        <div class="planCreationItem">
        <input type="number" onkeydown="return event.keyCode !== 69 && event.keyCode !== 190 && event.keyCode !== 110 && event.keyCode !== 189" type="text" id="ageMinInput" required>
        <label for="ageMinInput">Min</label>
        </div> 
        <div class="planCreationItem">
        <input type="number" min="12" onkeydown="return event.keyCode !== 69 && event.keyCode !== 190 && event.keyCode !== 110 && event.keyCode !== 189" type="text" id="ageMaxInput" required>
        <label for="ageMaxInput">Max</label>       
         </div>
        <div class="planCreationItem">
        <input type="number" onkeydown="return event.keyCode !== 69 && event.keyCode !== 189" id="premiumInput" required>
        <label for="premiumInput">Premium</label>
        </div>
        <button title="Create the plan" name="createPlan" class="queryResultItemCreate" id="createPlan" disabled>
        +
        </button>
        </div>
        <hr class="hr-1">
    `;
}
