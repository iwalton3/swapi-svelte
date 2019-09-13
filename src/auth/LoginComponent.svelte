<script>
    import login from './auth.js';
    import router from '../router/router.js';
    import notify from '../router/notify.js';
    import Textfield from '@smui/textfield';
    import Button, {Label} from '@smui/button';
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
    <form on:submit|preventDefault={sendOtp} class="form-small">
        <p>Please enter your email address to proceed.</p>
        <Textfield class="input-fw" type="email" bind:value={user} label="Email Address"/>
        <div class="row-small">
            <div class="align-right">
                <Button variant="unelevated"><Label>Next</Label></Button>
            </div>
        </div>
    </form>
{:else}
    <form on:submit|preventDefault={loginAct} class="form-small">
        <p>You should have recieved an email with a single-use login code. Enter it below.</p>
        <Textfield class="input-fw" type="email" value={user} label="Email Address" disabled />
        <Textfield class="input-fw" bind:value={otp} label="Login Code" />
        <div class="row-small">
            <div class="align-right">
                <Button variant="unelevated"><Label>Login</Label></Button>
            </div>
        </div>
    </form>
{/if}
