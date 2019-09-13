<script>
    import Page from '../router/Page.svelte';
    import Button, {Label} from '@smui/button';
    import login from './auth.js';
    import router from '../router/router.js';
    import notify from '../router/notify.js';

    async function logoff_all() {
        await $login.logoff_all();
        notify("Logoff successful.");
        router.setView("/");
    }
</script>

<Page title="Logoff All">
    <div class="form-small">
        <p>Are you sure? This will log you off from every device you are currently using.</p> 
        <div class="row-small">
            <div class="align-right">
                <Button on:click={logoff_all} variant="raised" color="primary"><Label>Logoff All</Label></Button>
                <Button on:click={() => router.setView("/")}><Label>Cancel</Label></Button>
            </div>
        </div>
    </div>
</Page>