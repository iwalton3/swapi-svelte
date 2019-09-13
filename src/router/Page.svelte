<script>
    import conf from '../conf.js';
    import { app, view } from './router.js';
    import Link from './Link.svelte';
    import MenuContent from './MenuContent.svelte';
    import { notificationList } from './notify.js';
    import Icon from '../components/Icon.svelte';
    import TopAppBar, {Row, Section, Title} from '@svelte-material-ui/top-app-bar';
    import IconButton from '@svelte-material-ui/icon-button';
    import Drawer, {AppContent, Content, Header, Title as DrawerTitle, Subtitle, Scrim} from '@smui/drawer';

    export let title = "Main Page";

    let drawer;
    let drawerOpen = false;
    let innerWidth;

    $: alwaysShow = innerWidth > 768;

    function close() {
        drawerOpen = false;
    }
</script>

<svelte:head>
    <title>{title} - {$app.name}</title>
</svelte:head>
<svelte:window bind:innerWidth={innerWidth}/>

<TopAppBar variant="static" prominent={false} dense={false} color="primary">
    <Row>
        <Section>
            {#if !alwaysShow}
                <IconButton class="material-icons" on:click={() => drawerOpen = !drawerOpen}>menu</IconButton>
            {/if}
            {#if $app.root != '/'}
                <Link view="/"><IconButton class="material-icons">home</IconButton></Link>
            {/if}
            <Title>{$app.name} - {title}</Title>
        </Section>
    </Row>
</TopAppBar>
<div class="drawer-container">
    {#if alwaysShow}
        <Drawer bind:this={drawer}>
            <Header>
                <DrawerTitle>{conf.site}</DrawerTitle>
            </Header>
            <Content>
                <MenuContent/>
            </Content>
        </Drawer>
    {:else}
        <Drawer variant="modal" bind:this={drawer} bind:open={drawerOpen}>
            <Header>
                <DrawerTitle>{conf.site}</DrawerTitle>
            </Header>
            <Content>
                <MenuContent/>
            </Content>
        </Drawer>
        <Scrim />
    {/if}
    <AppContent class="app-content">
        <main class="main-content">
            <slot/>
        </main>
    </AppContent>
</div>
{#if $notificationList.length > 0}
<div class="notify-list">
    {#each $notificationList as notification (notification.id)}
        <div class={`notify ${notification.severity}`}>
            <Icon alt={notification.severity} icon={notification.severity}/>
            <span role="alert">{notification.message}</span>
        </div>
    {/each}
</div>
{/if}