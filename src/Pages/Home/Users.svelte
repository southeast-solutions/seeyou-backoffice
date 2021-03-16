<script>
    import { onMount } from "svelte";
    import { guardAdmin, guardSignedUser } from "../../Services/AuthService";
    import {
        admin,
        promoter,
        tourOperator,
        contentCreator,
        concierge,
    } from "../../Enums/UserTypes";
    import { getUsers } from "../../Services/UsersService";

    import NavBar from "./NavBar.svelte";
    import PageLoader from "./PageLoader.svelte";

    import Promoter from "./UserInfo/Promoter.svelte";
    import TourOperator from "./UserInfo/TourOperator.svelte";
    import ContentCreator from "./UserInfo/ContentCreator.svelte";
    import Concierge from "./UserInfo/Concierge.svelte";

    let filterAdmin = false;
    let filterPromoter = false;
    let filterOperator = false;
    let filterCreator = false;
    let filterConcierge = false;

    let users = [];
    $: filteredUsers = [];
    let isLoaded = false;

    onMount(async () => {
        guardSignedUser();
        guardAdmin();

        users = (await getUsers()).users;
        filteredUsers = users;
        isLoaded = true;
    });

    const handleFilters = () => {
        if (
            !filterAdmin &&
            !filterPromoter &&
            !filterOperator &&
            !filterCreator &&
            !filterConcierge
        ) {
            filteredUsers = users;
            return;
        }
        filteredUsers = [];
        if (filterAdmin)
            filteredUsers.push(
                ...users.filter((user) => user.userType == admin)
            );
        if (filterPromoter)
            filteredUsers.push(
                ...users.filter((user) => user.userType == promoter)
            );
        if (filterOperator)
            filteredUsers.push(
                ...users.filter((user) => user.userType == tourOperator)
            );
        if (filterCreator)
            filteredUsers.push(
                ...users.filter((user) => user.userType == contentCreator)
            );
        if (filterConcierge)
            filteredUsers.push(
                ...users.filter((user) => user.userType == concierge)
            );
    };
</script>

<svelte:head>
    <title>Users</title>
</svelte:head><NavBar />
<div class="home-page-container">
    <div class="filters-container">
        <div class="single-filter-container">
            <button class="main-button" on:click={handleFilters}>Filter</button>
            <h3>User type</h3>
            <div class="filter-answers">
                <div class="filter-option">
                    <input type="checkbox" bind:checked={filterAdmin} />
                    Admin
                </div>
                <div class="filter-option">
                    <input type="checkbox" bind:checked={filterPromoter} />
                    Promoter
                </div>
                <div class="filter-option">
                    <input type="checkbox" bind:checked={filterOperator} />
                    Tour Operator
                </div>
                <div class="filter-option">
                    <input type="checkbox" bind:checked={filterCreator} />
                    Content Creator
                </div>
                <div class="filter-option">
                    <input type="checkbox" bind:checked={filterConcierge} />
                    Concierge
                </div>
            </div>
        </div>
    </div>
    <div class="content-container">
        {#if !isLoaded}
            <PageLoader />
        {:else if !filteredUsers.length}
            <div class="center-content">
                <h3>No users to show</h3>
            </div>
        {:else}
            {#each filteredUsers as user}
                <div class="user-container">
                    {#if user.userType == promoter}
                        <Promoter {user} />
                    {:else if user.userType == tourOperator}
                        <TourOperator {user} />
                    {:else if user.userType == contentCreator}
                        <ContentCreator {user} />
                    {:else if user.userType == concierge}
                        <Concierge {user} />
                    {:else if user.userType == admin}
                        <Concierge {user} isAdmin={true} />
                    {/if}
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .home-page-container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow-y: none;
    }

    .filters-container {
        width: 30%;
        height: 100%;
        background-color: #e8e7e2;
        display: flex;
        padding: 20px;
    }

    .user-container {
        margin-top: 20px;
        padding: 10px;
        width: 90%;
        background-color: white;
        border: 1px #223d4f solid;
        box-shadow: 4px 4px 8px rgba(86, 160, 124, 0.4);
    }
    .content-container {
        width: 70%;

        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        padding-bottom: 20px;
    }
    h3 {
        font-size: 24px;
    }
    .filter-answers {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
    }
    .filter-option {
        font-size: 20px;
    }
    input {
        margin-right: 5px;
        height: 15px;
        box-shadow: none;
    }
    .main-button {
        height: 30px;
        font-size: 16px;
        font-weight: 200;
        width: 80px;
    }
</style>
