import App from './App.svelte';
import './theme/global.scss';

// Set variable for legacy module loader that the bundle loaded.
window.bundle = true;

const app = new App({
    target: document.body,
    props: {}
});

export default app;