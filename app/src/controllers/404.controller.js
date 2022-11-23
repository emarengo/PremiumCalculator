import notFound from "../views/404.html"
import "../views/404.scss"

const loader = document.getElementById("spinner");

export default () => {

    loader.style.display = "none";
    const divElement = document.createElement("div")
    divElement.innerHTML = notFound
    return divElement
}