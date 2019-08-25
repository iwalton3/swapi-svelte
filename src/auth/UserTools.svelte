<script>
    import login from './auth.js';
    import Login from './Login.svelte';
    import Link from '../router/Link.svelte';
    import { darkTheme } from '../util.js';
</script>


<div class="section">
    <h3>Account</h3>
    {#if $login.user}
        <p>Welcome, {$login.user}!</p>
        <p>
            <img src="icons/leave.png" alt="logoff">
            <button class="link" on:click={$login.logoff}>Log Off</button>
        </p>
        <p>
            <img src="icons/leave.png" alt="logoff all">
            <button class="link" on:click={$login.logoff_all}>Log Off All Browsers</button>
        </p>
    {:else}
        <p>You are not logged in.</p>
        <p>
            <img src="icons/user.png" alt="login">
            <Link view={Login}>Log in</Link>
        </p>
    {/if}
    <p><label><input type="checkbox" bind:checked={$darkTheme}> Use Dark Theme?</label></p>
</div>