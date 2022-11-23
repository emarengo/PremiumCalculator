import notFound from "../views/404.html"

export default () => {
    const divElement = document.createElement("div")
    divElement.innerHTML = notFound
    return divElement
}