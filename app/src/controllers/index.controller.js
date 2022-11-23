import home from "../views/home.html"
import "../views/home.scss"

const loader = document.getElementById("spinner");

export default () => {
    loader.style.display = "none";

    const divElement = document.createElement("div")
    divElement.innerHTML = home
    return divElement
}