<script>
	import { Router, Route, Link } from "svelte-routing";
	import Login from "./Pages/Auth/Login.svelte";
	import Register from "./Pages/Auth/Register.svelte";
	import Profile from "./Pages/Home/Profile.svelte";
	import Users from "./Pages/Home/Users.svelte";
	import Experiences from "./Pages/Home/Experiences.svelte";
	import NotFound from "./Pages/NotFound.svelte";
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
		<div>
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Route path="/users" component={Users} />
			<Route path="/experiences" component={Experiences} />
			<Route path="/profile" component={Profile} />
			<Route path="/" component={Profile} />
			<Route component={NotFound} />
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
