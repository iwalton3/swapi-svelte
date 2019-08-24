<script>
    import router from './router.js';

    // You don't *have* to use this with this router,
    // but it will automatically find route names for you.
    // All you need is a reference to the page.

    export let view;
    export let params = {};
    export let title = undefined;
</script>

<a href={router.routeFor(view, params)} title>
    <slot/>
</a>