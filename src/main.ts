import App from './App.svelte';

const app = new App({
	target: document.body,
	hydrate: true
});
window.initMap = function ready() {
	app.$set({ ready: true });
}

export default app;