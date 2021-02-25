<script>
    import { onMount } from "svelte";
    import { guardSignedUser } from "../../Services/AuthService";
    import { getExpereinces } from "../../Services/ExperiencesService";
    import NavBar from "./NavBar.svelte";
    import PageLoader from "./PageLoader.svelte";

    let experiences = [];
    let selectedExperience = undefined;
    let isLoaded = false;

    onMount(async () => {
        guardSignedUser();
        experiences = (await getExpereinces()).experiences;
        isLoaded = true;
    });

    const highlightExperience = (experience) => {
        selectedExperience = experience;
    };
</script>

<svelte:head>
    <title>Experiences</title>
</svelte:head>
<NavBar />
<div class="home-page-container">
    <div class="filters-container">
        {#each experiences as experience}
            <div
                class="experience-title center-content"
                on:click={highlightExperience(experience)}
            >
                {experience.title}
            </div>
        {:else}
            {#if isLoaded}
                <div class="center-content">
                    <h3>Add an experience to start</h3>
                </div>
            {/if}
        {/each}
    </div>
    <div class="content-container">
        {#if !isLoaded}
            <PageLoader />
        {:else if !selectedExperience}
            <div class="center-content">
                <h3>No experience selected</h3>
            </div>
        {:else}
            <h1>{selectedExperience.title}</h1>
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
        padding-top: 80px;
        overflow-y: none;
    }

    .filters-container {
        width: 30%;
        height: 100%;
        background-color: #e8e7e2;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .experience-title {
        width: 100%;
        height: 80px !important;
        display: flex;
        cursor: pointer;
        user-select: none;
        font-size: 24px;
        transition: 0.5s;
    }
    .experience-title:hover {
        background-color: #223d4f;
        color: white;
    }

    .center-content {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
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
