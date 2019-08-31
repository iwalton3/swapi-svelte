<script>
    import router from './router.js';
    import Link from './Link.svelte';
    import login from '../auth/auth.js';
    import Icon from '../components/Icon.svelte';
</script>

<div class="section">
    <h3>Applications</h3>

    {#each router.appList as app}
        {#if !app.require || $login.has(app.require)}
            <p>
                <Icon icon={app.icon || "app"} alt="app"/>
                <Link view={app.routes.default}>{app.name}</Link>
            </p>
        {/if}
    {/each}
</div>