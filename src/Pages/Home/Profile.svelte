<script>
    import { onMount } from "svelte";
    import PageLoader from "./PageLoader.svelte";
    import {
        guardSignedUser,
        clearAuthLocalStorage,
    } from "../../Services/AuthService";
    import { getUserData } from "../../Services/ProfileService";
    import NavBar from "./NavBar.svelte";

    let user = undefined;

    onMount(async () => {
        guardSignedUser();
        user = await getUserData("abc");
    });
</script>

<svelte:head>
    <title>Profile</title>
</svelte:head>
<NavBar />

<div class="home-page-container">
    {#if user}
        <div class="right-row">
            <button
                class="main-button sign-out-button"
                on:click={clearAuthLocalStorage}>Sign out</button
            >
        </div>
        <div class="left-row"><h1>Profile</h1></div>
        <div class="center-row">
            <div class="profile-picture-button">
                {#if user.profileUrl}
                    <img
                        class="profile-picture-image"
                        src={user.profileUrl}
                        alt="profilePicture"
                    />
                {:else}
                    <i class="fi fi-rr-user" />
                {/if}
            </div>
        </div>
        {#if user.firstName && user.lastName}
            <div class="center-row">
                <div class="form-row">
                    <input
                        type="text"
                        class="half-row"
                        placeholder="First name"
                    />
                    <input
                        type="text"
                        class="half-row"
                        placeholder="Last name"
                    />
                </div>
            </div>
        {/if}
    {:else}
        <PageLoader />
    {/if}
</div>

<style>
    h1 {
        font-size: 52px;
        font-weight: 300;
    }
    .home-page-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .right-row {
        margin-top: 10px;
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .sign-out-button {
        height: 50px;
        width: 150px;
        font-size: 24px;
        font-weight: 200;
    }

    .left-row {
        width: 100%;
        width: 90%;
        display: flex;
        flex-direction: row;

        justify-content: flex-start;
        align-items: center;
    }

    .center-row {
        width: 100%;
        width: 90%;
        display: flex;
        flex-direction: row;
        margin-top: 20px;

        justify-content: center;
        align-items: center;
    }
    .profile-picture-button {
        object-fit: cover;
        cursor: pointer;
        margin-top: 10px;
        border-radius: 75px;
        height: 150px;
        width: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
        background-color: #549c79;
    }

    .profile-picture-image {
        object-fit: cover;
        cursor: pointer;
        border-radius: 75px;
        height: 150px;
        width: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .profile-picture-button > i {
        color: white;
        font-size: 42px;
    }
</style>
