import {ageToBirthday} from "../../src/functions/ageToBirthday"

describe("given an age (int)", () =>{

    let age = ""

    test("should return 1990 year of birth", () =>{
        age = 32
        const yearOfBirth = ageToBirthday(age)
        expect(yearOfBirth).toBe(1990)
    })

    test("should return 2010 year of birth", () =>{
        age = 12
        const yearOfBirth = ageToBirthday(age)
        expect(yearOfBirth).toBe(2010)
    })
})