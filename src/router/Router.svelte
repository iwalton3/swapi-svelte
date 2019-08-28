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
    router.handleLocationChange();

    function handlePopState(event) {
        router.handleLocationChange(event.state);
    }
</script>

<svelte:window on:popstate={handlePopState}/>
{#if !$appStore.require || $login.has($appStore.require)}
    <svelte:component this={$view}/>
{:else}
    <svelte:component this={router.special.authError}/>
{/if}
