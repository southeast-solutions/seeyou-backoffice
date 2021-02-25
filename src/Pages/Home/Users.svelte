<script>
    import { onMount } from "svelte";
    import { guardSignedUser } from "../../Services/AuthService";
    import NavBar from "./NavBar.svelte";
    import PageLoader from "./PageLoader.svelte";

    let users = [
        {
            userType: "promoter",
            firstName: "Andrei",
            lastName: "Ilie",
            email: "ilandrei98@gmail.com",
            phone: "0760998117",
            isVerified: false,
        },
        {
            userType: "promoter",
            firstName: "Andrei",
            lastName: "Ilie",
            email: "ilandrei98@gmail.com",
            phone: "0760998117",
            isVerified: false,
        },
        {
            userType: "promoter",
            firstName: "Andrei",
            lastName: "Ilie",
            email: "ilandrei98@gmail.com",
            phone: "0760998117",
            isVerified: false,
        },
        {
            userType: "promoter",
            firstName: "Andrei",
            lastName: "Ilie",
            email: "ilandrei98@gmail.com",
            phone: "0760998117",
            isVerified: false,
        },
    ];
    onMount(() => {
        guardSignedUser();
    });
</script>

<svelte:head>
    <title>Users</title>
</svelte:head><NavBar />
<div class="home-page-container">
    <div class="filters-container">
        <h3>Filters to be added</h3>
    </div>
    <div class="content-container">
        {#each users as user}
            <div class="user-container">
                {user.firstName}
            </div>
        {:else}
            <PageLoader />
        {/each}
    </div>
</div>

<style>
    .home-page-container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 80px;
        overflow-y: none;
    }

    .filters-container {
        width: 30%;
        height: 100%;
        background-color: #e8e7e2;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .user-container {
        margin-top: 20px;
        min-height: 300px;
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
</style>
