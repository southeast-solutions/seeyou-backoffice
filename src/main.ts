import App from './App.svelte';
declare global {
	interface Window {
		initMap: any;
	}
}

const app = new App({
	target: document.body,
	hydrate: true
});
window.initMap = function ready() {
	app.$set({ ready: true });
}

export default app;