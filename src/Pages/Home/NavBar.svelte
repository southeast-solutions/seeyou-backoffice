<script>
    import { navigate } from "svelte-routing";
    import {
        isAdmin,
        isTourOperator,
        clearAuthLocalStorage,
    } from "../../Services/AuthService";
    import { onMount } from "svelte";
    import NavBarMobile from "./NavBarMobile.svelte";

    let showExperiences = false;
    let showUsers = false;

    const onUsersPressed = () => {
        navigate("/users", { replace: false });
    };
    const onExperiencesPressed = () => {
        navigate("/experiences", { replace: false });
    };
    const onProfilePressed = () => {
        navigate("/profile", { replace: false });
    };

    const signOut = () => {
        clearAuthLocalStorage();
        navigate("/login");
    };

    onMount(() => {
        showExperiences = isTourOperator();
        showUsers = isAdmin();
    });
</script>

<div class="nav-container">
    <div class="logo-container">
        <img
            src="logo.png"
            alt="page-logo"
            class="logo"
            width={"50px"}
            height={"50px"}
        />
    </div>
    <div class="buttons-container">
        {#if showUsers}
            <div class="nav-button" on:click={onUsersPressed}>
                <i class="fi fi-rr-user-add" /> Users
            </div>
        {/if}
        {#if showExperiences}
            <div class="nav-button" on:click={onExperiencesPressed}>
                <i class="fi fi-rr-world" />Experiences
            </div>
        {/if}

        <div class="nav-button" on:click={onProfilePressed}>
            <i class="fi fi-rr-user" />Profile
        </div>

        <div class="nav-button" on:click={signOut}>
            <i class="fi  fi-rr-sign-out" />Sign Out
        </div>
    </div>
</div>
<div class="mobile-nav">
    <NavBarMobile />
</div>

<style>
    .nav-container {
        position: absolute;
        width: 100%;
        height: 60px;
        background-color: #132d5e;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .logo-container {
        padding: 10px;
    }
    .buttons-container {
        height: 100%;
        display: flex;
        flex-direction: row;
    }
    .nav-button {
        transition: 0.5s;
        user-select: none;
        cursor: pointer;
        height: 100%;
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 200;
        color: white;
    }
    .mobile-nav {
        display: none;
    }
    .nav-button > i {
        height: 30px;
        width: auto;
        margin-right: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .nav-button:hover {
        background-color: #019af6;
        color: white;
    }
    @media only screen and (max-width: 600px) {
        .nav-container {
            display: none;
        }
        .mobile-nav {
            display: block;
            height: 60px;
            width: 100%;
            position: absolute;
        }
    }
</style>
