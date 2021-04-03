<script>
    import { onMount } from "svelte";
    import {
        guardSignedUser,
        guardTourOperator,
    } from "../../Services/AuthService";
    import { getExpereinces } from "../../Services/ExperiencesService";
    import NavBar from "./NavBar.svelte";
    import PageLoader from "./PageLoader.svelte";
    import ExperienceInfo from "./ExperienceComponents/ExperienceInfo.svelte";
    import AddExperience from "./ExperienceComponents/AddExperience.svelte";

    let experiences = [];
    let selectedExperience = undefined;
    let isLoaded = false;
    let addExperienceMode = false;

    onMount(async () => {
        guardSignedUser();
        guardTourOperator();
        experiences = (await getExpereinces()).experiences;
        isLoaded = true;
    });

    const highlightExperience = (experience) => {
        selectedExperience = experience;
        addExperienceMode = false;
    };
    const addExperienceClicked = () => {
        addExperienceMode = true;
    };

    const experienceAdded = async () => {
        experiences = (await getExpereinces()).experiences;
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
                class="experience-title"
                on:click={highlightExperience(experience)}
            >
                {experience.name}
            </div>
        {/each}
        <button
            class="main-button add-experience-button"
            on:click={addExperienceClicked}>Add Experience</button
        >
    </div>
    <div class="content-container">
        {#if !isLoaded}
            <PageLoader />
        {:else if addExperienceMode}
            <AddExperience on:added={experienceAdded} />
        {:else if !selectedExperience}
            <div class="center-content">
                <h3>No experience selected</h3>
            </div>
        {:else}
            <ExperienceInfo data={selectedExperience} />
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
        align-items: center;
        flex-direction: column;
    }

    .experience-title {
        width: 100%;
        min-height: 80px;
        cursor: pointer;
        user-select: none;
        font-size: 20px;
        transition: 0.5s;
        padding: 10px;
        overflow: hidden;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .experience-title:hover {
        background-color: #223d4f;
        color: white;
    }

    .center-content {
        width: 100%;
        height: 100%;
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
    .add-experience-button {
        width: 100%;
        font-size: 20px;
        font-weight: 200;
        height: 80px;
    }
</style>
