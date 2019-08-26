<script context="module">
    // This is a hash router, which should be easy to deploy.
    // The architecture of the app framework is independent of
    // the routing mechanism, so an HTML5 router could be made. 

    import router, { view, app as appStore } from './router.js';
    import login from '../auth/auth.js';
</script>

<script>
    export let app = {};

    router.decodeRoutes(app);
    router.handleHashChange();
</script>

<svelte:window on:hashchange={router.handleHashChange.bind(router)}/>
{#if !$appStore.require || $login.has($appStore.require)}
    <svelte:component this={$view}/>
{:else}
    <svelte:component this={router.special.authError}/>
{/if}
