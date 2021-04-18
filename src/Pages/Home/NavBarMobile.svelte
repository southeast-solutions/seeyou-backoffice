<script>
    import { navigate } from "svelte-routing";
    import { fade } from "svelte/transition";
    import {
        isAdmin,
        isTourOperator,
        clearAuthLocalStorage,
    } from "../../Services/AuthService";
    import { onMount } from "svelte";

    let showExperiences = false;
    let showUsers = false;
    let menuActive = false;

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

    const hamburgerClicked = () => {
        menuActive = !menuActive;
    };
</script>

<div class="nav-container-mobile">
    <div class="logo-container">
        <img
            src="logo.png"
            alt="page-logo"
            class="logo"
            width={"50px"}
            height={"50px"}
        />
    </div>
    <div class="hamburger-container" on:click={() => hamburgerClicked()}>
        {#if !menuActive}
            <i class="fi  fi-rr-menu-burger" />
        {:else}
            <i class="fi  fi-rr-cross" />
        {/if}
    </div>
</div>
{#if menuActive}
    <div class="menu-container" transition:fade={{ duration: 100 }}>
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
{/if}

<style>
    .nav-container-mobile {
        position: absolute;
        width: 100%;
        height: 60px;
        background-color: #132d5e;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 5px 10px;
        color: white;
        z-index: 10;
    }
    .hamburger-container {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        user-select: none;
    }
    .menu-container {
        position: absolute;
        background-color: #e8e7e2;
        top: 60px;
        width: 100%;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
        z-index: 10;
    }
    .nav-button {
        transition: 0.5s;
        user-select: none;
        cursor: pointer;
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 200;
        color: #132d5e;
    }
</style>
