<script>
    import login from './auth.js';
    import router from '../router/router.js';
    import notify from '../router/notify.js';
    export let after = null;

    let user = "";
    let otp = "";

    async function sendOtp() {
        try {
            await $login.send_otp(user);
        } catch (_) {
            notify("Could not send email.", "error");
        }
    }

    async function loginAct() {
        const success = await $login.login(otp);
        if (!success)
            notify("Login failed. Please try again.", "error");
        else
            notify("Login successful.");
        if (success && after)
            router.setView(after);
    }
</script>

{#if !$login.partialLogin}
    <form on:submit|preventDefault={sendOtp}>
        <p>Please enter your email address to proceed.</p>
        <label>Email Address: <input type="text" bind:value={user}></label>
        <input type="submit" value="Next"/>
    </form>
{:else}
    <form on:submit|preventDefault={loginAct}>
        <p>You should have recieved an email with a single-use login code. Enter it below.</p>
        <label>Email Address: <input type="text" value={user} disabled></label> 
        <label>Login Code: <input type="text" bind:value={otp}></label>
        <input type="submit" value="Login"/>
    </form>
{/if}
