<script>
    import LoginComponent from './LoginComponent.svelte';
    import Page from '../router/Page.svelte';
    import { app } from '../router/router.js';
</script>

<Page title="Login Required">
    <p>You need the {$app.require} permission to use this app. Please login.</p>
    <div class="section">
        <h3>Login</h3>
        <LoginComponent/>
    </div>
</Page>
