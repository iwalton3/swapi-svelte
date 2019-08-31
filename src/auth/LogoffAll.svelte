<script>
    import Page from '../router/Page.svelte';
    import Icon from '../components/Icon.svelte';
    import login from './auth.js';
    import Link from '../router/Link.svelte';
    import router from '../router/router.js';
    import notify from '../router/notify.js';

    async function logoff_all() {
        await $login.logoff_all();
        notify("Logoff successful.");
        router.setView("/");
    }
</script>

<Page title="Logoff All">
    <p>Are you sure? This will log you off from every device you are currently using.</p> 
    <p>
        <Icon icon="leave" alt="logoff all"/>
        <button class="link" on:click={logoff_all}>Log Off All Browsers</button>
    </p>
    <p>
        <Icon icon="cancel" alt="cancel"/>
        <Link view="/" class="link">Cancel</Link>
    </p>
</Page>