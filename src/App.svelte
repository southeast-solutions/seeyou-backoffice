<script>
	import { Router, Route, Link } from "svelte-routing";
	import Login from "./Pages/Auth/Login.svelte";
	import Register from "./Pages/Auth/Register.svelte";
</script>

<main>
	<Register />
</main>

<style>
	main {
		height: 100vh;
		width: 100vw;
		overflow-x: auto;
		overflow-y: hidden;
	}
</style>
