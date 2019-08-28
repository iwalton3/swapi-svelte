<script>
    import router from './router.js';

    // The Link tag is required if you are using HTML5
    // routing. It is encouraged for hash routing, but
    // not technically required.

    // The 'view' argument accepts:
    // - View Object Reference
    // - Relative path "view" or "../view"
    // - Absolute path "/view"

    export let view;
    export let params = {};
    export let title = undefined;
    export let className = undefined;
    const state = router.routeState(view, params);
    const fullPath = router.gen(state);

    function click() {
        router.setView(view, params, fullPath)
    }
</script>

<a href={fullPath} on:click|preventDefault={click} class={className} title>
    <slot/>
</a>
