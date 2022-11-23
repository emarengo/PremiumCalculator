export function renderPlans(results) {
  return results
    .map((result, index) => {
      return ` <div class="query-result-plans">
        <div class="query-result-item">
            <input type="text" id="carrier-${index}" value="${result.carrier}" required disabled>
            <label for="carrier-${index}">Carrier</label>
        </div>
        <div class="query-result-item">
            <input type="text" id="plan-${index}" value="${result.plan}" required disabled>
            <label for="plan-${index}">Plan</label>
        </div> 
        <div class="query-result-item">
            <input type="text" id="state-${index}" value="${result.state}" required disabled>
            <label for="state-${index}">state</label>
        </div>
        <div class="query-result-item">
        <input type="text" id="month-of-birth-${index}"  value="${result.monthOfBirth}" required disabled>
        <label for="month-of-birth-${index}">Month</label>
        </div>
        <div class="query-result-item">
            <input type="text" id="age-min-${index}" value="${result.ageRangeMin}" required disabled>
            <label for="age-min-${index}">Age min</label>
        </div> <div class="query-result-item">
        <input type="text" id="age-max-${index}"  value="${result.ageRangeMax}" required disabled>
        <label for="age-max -${index}">Age max</label>
        </div>
        <div class="query-result-item">
        <input type="text" id="premium-${index}"  value="${result.premium}" required disabled>
        <label for="premium-${index}">Premium</label>
        </div>
        <button title="Delete this plan" name="deletePlan" value="${result.id}" class="query-result-item-delete">
        X
        </button>
        </div>
        <hr class="hr-1">
    `;
    })
    .join(" ");
}
