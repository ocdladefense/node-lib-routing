

/**
 * Router class to manage routes and menus.
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

    #menus = {};

    #notFoundCallback;

    /**
     * @private
     * @type {string}
     */
    #defaultPage;

    /**
     * Creates an instance of Router.
     * @param {Array} routes - The initial routes.
     */
    constructor(routes) {
        this.#routes = routes || [];
    }

    /**
     * Adds a menu with specified items.
     * @param {string} menuId - The ID of the menu.
     * @param {Array} items - The items to add to the menu.
     */
    addMenu(menuId, items) {
        this.#menus[menuId] = items;
    }

    /**
     * Converts routes to menu items.
     * @param {Array} routes - The routes to convert.
     * @returns {Array} The converted menu items.
     */
    static toMenuItems(routes) {
        return routes.map(route => {
            return { url: route.path, label: route.callback.toLowerCase(), hidden: false };
        });
    }

    /**
     * Sets the component path.
     * @param {string} path - The path to set.
     */
    setComponentPath(path) {
        Router.componentPath = path;
    }

    /**
     * Sets the callback for not found routes.
     * @param {Function} callback - The callback to set.
     */
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
