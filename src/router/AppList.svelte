<script>
    import router from './router.js';
    import Link from './Link.svelte';
    import login from '../auth/auth.js';
</script>

<div class="section">
    <h3>Applications</h3>

    {#each router.appList as app}
        {#if !app.require || $login.has(app.require)}
            <p>
                <img src={app.icon || "icons/app.png"} alt="app">
                <Link view={app.routes.default}>{app.name}</Link>
            </p>
        {/if}
    {/each}
</div>