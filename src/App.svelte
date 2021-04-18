<script lang="ts">
	import { Router, Route, Link } from "svelte-routing";
	import Login from "./Pages/Auth/Login.svelte";
	import Register from "./Pages/Auth/Register.svelte";
	import Profile from "./Pages/Home/Profile.svelte";
	import Users from "./Pages/Home/Users.svelte";
	import Experiences from "./Pages/Home/Experiences.svelte";
	import NotFound from "./Pages/NotFound.svelte";
	import Register2 from "./Pages/Auth/Register2.svelte";
	import ConfirmAccout from "./Pages/Auth/ConfirmAccout.svelte";
	export let url = "";
</script>

<svelte:head>
	<script
		defer
		async
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGra0Pv79SE1Hs4UEbcYk9VrOOUgUBX48&callback=initMap">
	</script>
</svelte:head>
<main>
	<Router {url}>
		<Route path="confirm-account" component={ConfirmAccout} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register2} />
		<Route path="/users" component={Users} />
		<Route path="/experiences" component={Experiences} />
		<Route path="/profile" component={Profile} />
		<Route path="/" component={Profile} />
		<Route component={NotFound} />
	</Router>
</main>

<style>
	main {
		height: 100vh;
		width: 100vw;
		overflow-x: auto;
		overflow-y: hidden;
	}
	@media only screen and (max-width: 600px) {
		main {
			height: auto;
			overflow-y: auto;
		}
	}
</style>
