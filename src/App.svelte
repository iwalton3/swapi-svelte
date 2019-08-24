<script>
	// Templates and Routing
	import Router from './router/Router.svelte';
	import Home from './Home.svelte';

	// Apps
	import Auth from './auth/app.js'

	const app = {
		name: "SPA Test",
		routes: {
			default: Home,
			auth: Auth
		}
	};
</script>

<Router {app}/>
