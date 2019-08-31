# Swapi-Svelte

This is a client for swapi written in Svelte. It uses a custom router intended for routing multiple relatively self-contained applications.

For those who are unaware of Svelte, It is easy to learn web framework, packed with features. It builds some of the most compact and performant single page web applications.

To build the project, you'll need an swapi server. Download the `api.js` from your server by appending `.js` to the end of your API url. Run `npm install` to download the build dependencies. Then use `npm run build` to build. For development, use `npm run dev`.

## Using as a template with any backend.

The swapi system is the optional backend, which was written first. It provides the user and session management for this front-end. If desired, it is possible to write a new back-end instead of using swapi, as this svelte template has a lot of features that may be desired in other projects. Please see the contents of `api.js` for information on what API functionality is expected by the authorization and user management system provided by this template.

## HTML5 Routing

The template uses hash routing (`/#/`) by default for easier deployment. If you wish to use HTML5 routing, simply set a base href in the document and the router will automatically switch to using real paths and redirect all hash routes to real paths.

Note that HTML5 routing requires a configuration on your server. For apache, you can use the following `.htaccess` or directory configuration:

```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} -s [OR]
RewriteCond %{REQUEST_FILENAME} -l [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^.*$ - [NC,L]

RewriteRule ^(.*) index.html [NC,L]
```

For nginx, use try\_files:
```
try_files $uri $uri/ /index.html;
```

## Material UI

This repository contains all the dependencies and build configurations to use Material UI with svelte.

## SCSS Support

You can use scss files by including them from main.js globally or by using `lang="sass"` in a svelte component. Please note that scss in svelte components doesn't play nice with the Visual Studio Code svelte extension.

## IE 11 Support

This repository also implements IE 11 polyfills. The polyfills are not loaded on modern browsers.
