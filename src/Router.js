

/**
 * @classdesc Router class to handle routing logic for a web application.
 */
class Router {


    basePath = "/";

    /**
     * The default path to look for when loading components.
     */
    static componentPath = "/src/components";

    /**
     * @private
     * @type {Object}
     */
    #routes = [];

    /**
     * @private
     * @type {string}
     */
    #defaultPage;

    /**
     * Creates an instance of Router.
     * @constructor
     * @param {Object} routes - An object mapping route names to page components.
     */

    #notFoundCallback;


    constructor(routes) {
        this.#routes = routes || [];
    }


    setComponentPath(path) {
        Router.componentPath = path;
    }

    setNotFoundCallback(callback) {
        this.#notFoundCallback = callback;
    }


    match(_path) {
        // Leave the root path alone; compensate for any trailing slashes.
        const normalized = _path === '/' ? '/' : _path.replace(/\/+$/, '');
        const parts = normalized.split('/');
        const _var = parts.length > 2 ? parts[parts.length - 2] : null;

        for (const r of this.#routes.reverse()) {
            let { path, callback, params } = r;

            path = path.replaceAll('/', '\\/');

            // May need to add in modifiers / flags.
            const re = new RegExp(path);
            const matches = _path.match(re);

            // If matches is null, then this didn't match.
            if(!matches) continue;

            if (null !== _var) {
                params[_var] = matches[1];
            }

            return [callback, params];
        }

        return [this.#notFoundCallback, {}];
    }



    setBasePath(path) {
        this.basePath = path;
    }

    /**
     * Gets the current location from the URL.
     * @returns {string} The current location.
     */
    getLocation() {
        return window.location.href.split("/").at(-1).toLowerCase();
    }

    /**
     * Sets the default page to be used when no route matches.
     * @param {string} page - The default page component.
     */
    setDefaultPage(page) {
        this.#defaultPage = page;
    }

        


    addRoute(path, callback, params = {}) {
        const routeExists = this.#routes.find(r => r.route === path);

        if (routeExists) {
            routeExists.id = id;
            routeExists.callback = callback;
        } else this.#routes.push({ path, callback, params });
    }




    /**
     * Gets the current route from the URL.
     * @returns {string} The current route.
     */
    getRoute() {
        return window.location.href.split("/").at(-1).toLowerCase();
    }
}


export default Router;
