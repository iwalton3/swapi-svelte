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
        this.hashRouting = true;
        const baseElem = document.getElementsByTagName("base")[0];
        if (baseElem) {
            this.base = baseElem.href;
            this.hashRouting = false;
            if (this.base.endsWith("/"))
                this.base = this.base.substring(0,this.base.length-1);
        } else {
            this.base = document.location.split("#")[0] + "#";
        }
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
                root: incr
            };
            Object.assign(app, routes);
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

    decode(location) {
        const fullPath = location.substring(this.base.length);
        const pathParts = fullPath.split("?");
        const path = pathParts[0];
        const params = {};
        if (pathParts.length > 1) {
            var paramsList = pathParts[1].split("&");
            for (let i=0; i<paramsList.length; i++) {
                var t = paramsList[i].split("=");
                params[t[0]] = decodeURIComponent(t[1]);
            }
        }
        return { path, params }; 
    }

    gen({path, params}) {
        let fullPath = this.base + path;
        let i = 0;
        for (var item in params) {
            if (i == 0) fullPath += "?";
            else fullPath += "&";
            fullPath += item + "=" + encodeURIComponent(params[item]);
            i++;
        }
        return fullPath;
    }

    handleLocationChange(state) {
        if (!state) {
            state = this.decode(document.location.href);
        }
        let route = this.routeMap[state.path];
        if (!route) {
            const redirect = this.routeMap[state.path+"/"];
            if (!this.hashRouting && document.location.hash && document.location.hash[1] == "/") {
                this.replaceView(document.location.hash.substring(1).split("?")[0], state.params);
                return;
            } else if (redirect && state.path != "") {
                this.replaceView(state.path+"/", state.params);
                return;
            } else {
                route = this.routeMap["/"];
            }
        }
        view.set(route.view);
        const appObj = {
            view: route.view,
        };
        Object.assign(appObj, route.app);
        app.set(appObj);
        params.set(state.params);
    }

    setView(view, params={}, fullPath=null) {
        const state = this.routeState(view, params);
        if (!fullPath)
            fullPath = this.gen(state);
        history.pushState(state, "", fullPath);
        this.handleLocationChange(state);
    }

    replaceView(view, params={}, fullPath=null) {
        const state = this.routeState(view, params);
        if (!fullPath)
            fullPath = this.gen(state);
        history.replaceState(state, "", fullPath);
        this.handleLocationChange(state);
    }

    relative(path) {
        const finalPathParts = [];
        let pathParts = document.location.href.substring(this.base.length).split("/");
        pathParts = pathParts.slice(0, pathParts.length-1);
        pathParts = pathParts.concat(path.split("/"));
        for (let i = 0; i < pathParts.length; i++) {
            if (i+1 < pathParts.length && pathParts[i+1] == "..") {
                i += 1;
            } else {
                finalPathParts.push(pathParts[i]);
            }
        }
        return finalPathParts.join("/");
    }

    routeState(view, params={}) {
        let path = view;
        if (typeof(view) != "string") {
            // view is a view object
            path = this.routeForMap.get(view);
        } else if (!view.startsWith("/")) {
            // view is relative
            path = this.relative(view);
        }
        return {path, params};
    }

    routeFor(view, params={}) {
        return this.gen(this.routeState(view, params));
    }
}

const router = new Router();
export default router

