import admin from "../views/admin.html"

const getPlans = async () => {
    const response = await fetch("https://dummyjson.com/products/1")
    return await response.json()
}
export default async () => {
    const divElement = document.createElement("div")
    divElement.innerHTML = admin

    const btnClick  = divElement.querySelector("#btnClick2");
    btnClick.addEventListener("click", () => {
        alert("yeah")
    })

    const plans = await getPlans()
    return divElement
}