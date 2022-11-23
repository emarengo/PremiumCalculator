import {pages} from "../controllers/index"
const { home, admin, query, notFound } = pages
let content = document.getElementById("root");
const router = async (route) => {
    content.innerHTML = "";

  switch (route) {
    case "#/home":
      return content.appendChild(home());
    case "#/query": {
        return content.appendChild(await query());
    }
    case "#/admin":
        return content.appendChild(await admin());
    default:
        return content.appendChild(notFound());
  }
};
export { router };
