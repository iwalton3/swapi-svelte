<script>
    import {AppContent, Content, Header, Title as DrawerTitle, Subtitle, Scrim} from '@smui/drawer';
    import List, {Item, Text, Separator, Graphic, Subheader} from '@smui/list';
    import MatLink from './MatLink.svelte';
    import router, { app, view } from './router.js';
    import login from '../auth/auth.js';
    import H6 from '@smui/common/H6.svelte';

    function logoff() {
        $login.logoff();
    }
</script>

<List>
    {#each router.appList as capp}
        {#if !capp.require || $login.has(capp.require)}
            <MatLink view={capp.routes.default} activated={$view === capp.root}>
                <Graphic class="material-icons" aria-hidden="true">{capp.icon || "insert_drive_file"}</Graphic>
                <Text>{capp.name}</Text>
            </MatLink>
        {/if}
    {/each}

    <Separator nav />
    {#if $login.user}
        <Subheader component={H6}>Account ({$login.user})</Subheader>
        <Item href="#" on:click={logoff} activated={false}>
            <Graphic class="material-icons" aria-hidden="true">account_box</Graphic>
            <Text>Logoff</Text>
        </Item>
        <MatLink view="/auth/logoff_all" activated={$view === '/auth/logoff_all' }>
            <Graphic class="material-icons" aria-hidden="true">account_box</Graphic>
            <Text>Logoff All</Text>
        </MatLink>
    {:else}
        <Subheader component={H6}>Login</Subheader>
        <MatLink view="/auth" activated={$view === '/auth' }>
            <Graphic class="material-icons" aria-hidden="true">account_box</Graphic>
            <Text>Login</Text>
        </MatLink>
    {/if}
</List>
