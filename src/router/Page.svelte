<script>
    import conf from '../conf.js';
    import { app } from './router.js';
    import login from '../auth/auth.js';
    import { darkTheme } from '../util.js';
    import Link from './Link.svelte';
    import { notificationList } from './notify.js';

    export let title = "Main Page";
    export let wide = false;
    export let header = true;
    export let dark = false;

    const notifyImg = {
        "warn": "icons-sm/warn.svg",
        "info": "icons-sm/info.svg",
        "error": "icons-sm/error.svg"
    }

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

div {
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

<div class:wide>
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
<div class="nlist">
    {#each $notificationList as notification (notification.id)}
        <div class={notification.severity}>
            <img alt={notification.severity} src={notifyImg[notification.severity]}>
            <span role="alert">{notification.message}</span>
        </div>
    {/each}
</div>
{/if}