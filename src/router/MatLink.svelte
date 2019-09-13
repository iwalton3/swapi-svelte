<script>
    import router from './router.js';
    import {Item} from '@smui/list';

    // The Link tag is required if you are using HTML5
    // routing. It is encouraged for hash routing, but
    // not technically required.

    // The 'view' argument accepts:
    // - View Object Reference
    // - Relative path "view" or "../view"
    // - Absolute path "/view"

    export let view;
    export let activated = false;
    export let params = {};
    const state = router.routeState(view, params);
    const fullPath = router.gen(state);

    function click(event) {
        event.preventDefault();
        router.setView(view, params, fullPath);
    }
</script>

<Item href={fullPath} on:click={click} {activated}>
    <slot/>
</Item>