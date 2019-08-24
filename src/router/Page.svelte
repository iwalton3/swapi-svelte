<script>
    import conf from '../conf.js';
    import { app } from './router.js';
    import login from '../auth/auth.js';
    export let title = "Main Page";
    export let wide = false;
</script>

<style>
nav {
	padding: 0 0 0 48px;
	position: relative;
}

nav img {
    left: 0;
    position: absolute;
    top: 0;
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
    <nav>
        <h1><a className="title" href="/"><img src="{conf.logo}" alt="logo">{conf.site}</a></h1>
        <h3><a href={$app.root}>{$app.name}</a> - {title}</h3>
    </nav>
    {#if !app.require || $login.has(app.require)}
        <slot/>
    {:else}
        You need the {app.require} permission to use this app. Please login.
    {/if}
</div>
