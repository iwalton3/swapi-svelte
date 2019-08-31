<script>
    import conf from '../conf.js';
    import { app } from './router.js';
    import login from '../auth/auth.js';
    import { darkTheme } from '../util.js';
    import Link from './Link.svelte';
    import { notificationList } from './notify.js';
    import Icon from '../components/Icon.svelte';

    export let title = "Main Page";
    export let wide = false;
    export let header = true;
    export let dark = false;

    $: useDark = dark || $darkTheme
    $: if (useDark) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
</script>

<style>
nav {
    padding: 0 0 0 48px;
    position: relative;
    margin-top: 20px;
}

a.title {
    color: #2a2a2a;
}

nav img {
    left: 0;
    position: absolute;
}

.page {
    margin:0 auto;
    padding-top:20px;
    max-width:700px;
}

.wide {
    max-width:100%;
    padding-left: 20px;
    padding-right: 20px;
}

h1 {
    font-size: 2em;
}
</style>

<svelte:head>
    <title>{title} - {$app.name}</title>
</svelte:head>

<div class="page" class:wide>
    {#if header}
        <nav>
            <h1>
                {#if (conf.useLocalHome && $app.root != "/") || conf.alwaysUseLocalHome}
                    <Link className="title" view="/"><img src="{conf.logo}" alt="logo">{conf.site}</Link>
                {:else}
                    <a class="title" href="/"><img src="{conf.logo}" alt="logo">{conf.site}</a>
                {/if}
            </h1>
            <h3><Link view={$app.root}>{$app.name}</Link> - {title}</h3>
        </nav>
    {/if}
    <slot/>
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