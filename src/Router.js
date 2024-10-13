/** @jsx vNode */ /** @jsxFrag "Fragment" */
import { vNode, View } from "@ocdla/view";

/**
 * @classdesc Router class to handle routing logic for a web application.
 */
class Router {

    /**
     * @private
     * @type {Object}
     */
    #routes;

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
    constructor(routes) {
        this.#routes = routes;
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

    /**
     * Gets the page component for the current route.
     * @returns {Promise<*>} A promise that resolves to the page component.
     */
    async getPage() {
        const location = window.location.href.split("/").at(-1).toLowerCase();
        
        // Module providing the component.
        let module;

        // Component that should be imported and then injected into the page.
        let page = this.#routes[location] || this.#defaultPage;

        module = await import(`../../../../src/components/pages/${page}`);

        return module.default;
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
