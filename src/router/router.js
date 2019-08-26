import { writable } from 'svelte/store';

// You can write to these and it will work,
// but that isn't encouraged.
export const app = writable(null);
export const view = writable(null);
export const params = writable(null);

class Router {
    constructor() {
        this.appList = [];
        this.routeMap = {};
        this.routeForMap = new Map();
        this.callback = null;
        this.special = {};
    }
    
    decodeRoutes(routes, incr="", app=null) {
        if (incr == "") {
            // Executes for root only.
            this.special = routes.special;
        }

        if (routes.routes) {
            incr = `${incr}/`
            const app = { 
                name: routes.name,
                root: `#${incr}`,
                ...routes
            }
            if (!routes.unlisted && incr != "/") {
                this.appList.push(routes);
            }
            for (let route in routes.routes) {
                if (route == "default") {
                    this.decodeRoutes(routes.routes[route], incr, app);
                } else {
                    this.decodeRoutes(routes.routes[route], `${incr}${route}`, app);
                }
            }
        } else {
            this.routeMap[incr] = {
                view: routes,
                app
            };
            this.routeForMap.set(routes, incr);            
        }
    }

    decodeHash(fullHash) {
        const hash = fullHash.substring(1);
        const hashParts = hash.split("?");
        const path = hashParts[0];
        const params = {};
        if (hashParts.length > 1) {
            var paramsList = hashParts[1].split("&");
            for (let i=0; i<paramsList.length; i++) {
                var t = paramsList[i].split("=");
                params[t[0]] = decodeURIComponent(t[1]);
            }
        }
        return { path, params }; 
    }

    genHash({path, params}) {
        var hash = "#" + path;
        var i = 0;
        for (var item in params) {
            if (i == 0) hash += "?";
            else hash += "&";
            hash += item + "=" + encodeURIComponent(params[item]);
            i++;
        }
        return hash;
    }

    handleHashChange() {
        const state = this.decodeHash(window.location.hash);
        const route = (this.routeMap[state.path]
                       || this.routeMap[state.path+"/"]
                       || this.routeMap["/"]);
        view.set(route.view);
        app.set({
            view: route.view,
            ...route.app
        });
        params.set(state.params);
    }

    setView(view, params={}) {
        window.location.hash = this.routeFor(view, params);
    }

    routeFor(view, params={}) {
        return this.genHash({
            path: this.routeForMap.get(view),
            params
        });
    }
}

const router = new Router();
export default router

