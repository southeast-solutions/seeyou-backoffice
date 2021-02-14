<script>
	import { Router, Route, Link } from "svelte-routing";
	import Login from "./Pages/Auth/Login.svelte";
	import LoginPending from "./Pages/Auth/LoginPending.svelte";
	import Register from "./Pages/Auth/Register.svelte";
	export let url = "";
</script>

<main>
	<Router {url}>
		<div>
			<Route path="loginPending" component={LoginPending} />
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />
			<Route path="/"><Login /></Route>
		</div>
	</Router>
</main>

<style>
	main {
		height: 100vh;
		width: 100vw;
		overflow-x: auto;
		overflow-y: hidden;
	}
</style>
