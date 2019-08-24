<script context="module">
    // This is a hash router, which should be easy to deploy.
    // The architecture of the app framework is independent of
    // the routing mechanism, so an HTML5 router could be made. 

    import router, { view } from './router.js';
</script>

<script>
    export let app = {};

    router.decodeRoutes(app);
    router.handleHashChange();
</script>

<svelte:window on:hashchange={router.handleHashChange.bind(router)}/>
<svelte:component this={$view}/>