import indexController from "./index.controller"
import queryController from "./query.controller"
import adminController from "./admin.controller"
import notFoundController from "./404.controller"

const pages = {
    home: indexController,
    query: queryController,
    admin: adminController,
    notFound: notFoundController
}

export { pages }