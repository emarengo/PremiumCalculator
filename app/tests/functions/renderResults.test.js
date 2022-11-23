import {renderResults} from "../../src/functions/renderResults"

describe("given a mocked Plan", () =>{

    const mockedPlan = [{
        "carrier": "qwerty",
        "plan": "B",
        "state": "NY",
        "monthOfBirth": "September",
        "ageRangeMin": 21,
        "ageRangeMax": 45,
        "premium": 150
      }]

    test("should return 'qwerty' has value", () =>{
       const renderedResults = renderResults(mockedPlan)
       expect(renderedResults).toContain('value="qwerty"')
    })

    test("should return '150' has premium value", () =>{
        const renderedResults = renderResults(mockedPlan)
        expect(renderedResults).toContain('value="150"')
     })
 
})