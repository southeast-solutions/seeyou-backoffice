<script>
    import { afterUpdate, createEventDispatcher } from "svelte";

    import { vacation } from "../../../Enums/ExperienceTypes";
    import Map from "./Map.svelte";
    import Carousel from "./Carousel.svelte";
    import Input from "../../../SharedComponents/Input.svelte";
    import { deleteEx } from "../../../Services/ExperiencesService";

    const dispatch = createEventDispatcher();

    export let data;

    let deleteMode = false;
    $: deleteInputValue = "";

    let dateObj;
    let includedServicesArray;
    let notIncludedServicesArray;
    let photos;

    afterUpdate(() => {
        processProps();
    });

    const processProps = () => {
        dateObj = undefined;
        includedServicesArray = undefined;
        notIncludedServicesArray = undefined;
        photos = undefined;

        if (data.dateTime) {
            dateObj = new Date(data.dateTime);
        }

        if (Array.isArray(data.includedServices)) {
            includedServicesArray = data.includedServices;
        }
        if (Array.isArray(data.notIncludedServices)) {
            notIncludedServicesArray = data.notIncludedServices;
        }
        if (Array.isArray(data.highlights)) {
            photos = data.highlights;
        }
    };

    const deleteExperience = async () => {
        console.log(data.id);
        await deleteEx(data.id);
        dispatch("deleted");
    };
</script>

<div class="experience__container">
    {#if photos}
        {#if photos.length}
            <div
                class="experience__row__horizontal__padding experience__row__generic"
            >
                <Carousel items={photos} />
            </div>
        {/if}
    {/if}

    <div class="experience__row__horizontal__padding experience__row__generic">
        <h1>{data.name}</h1>
    </div>

    {#if data.duration && data.price && data.type && data.numberOfTourists}
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <div class="experience__row__section">
                <i class="fi fi-rr-flame" />
                {data.type}
            </div>
            <div class="experience__row__section">
                <i class="fi fi-rr-clock" />
                {data.duration}
                {#if data.type == vacation}
                    days
                {:else}
                    hours
                {/if}
            </div>
            <div class="experience__row__section">
                <i class="fi fi-rr-dollar" />
                {data.price} RON
            </div>
            <div class="experience__row__section">
                <i class="fi fi-rr-users" />
                For {data.numberOfTourists} people
            </div>
        </div>
    {/if}

    {#if data.availableLanguages}
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <div class="experience__row__section">
                <i class="fi fi-rr-world" /> Available in: {data.availableLanguages}
            </div>
        </div>
    {/if}

    {#if dateObj}
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <div class="experience__row__section">
                <i class="fi fi-rr-alarm-clock" />
                {dateObj.getDay()}/{dateObj.getMonth()}/{dateObj.getFullYear()}
            </div>
            <div class="experience__row__section">
                {dateObj.getHours()}:{dateObj.getMinutes()}
            </div>
        </div>
    {/if}
    {#if data.description}
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <h3>Description</h3>
        </div>
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            {data.description}
        </div>
    {/if}
    {#if includedServicesArray}
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <h3>Included services</h3>
        </div>
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <div>
                {#each includedServicesArray as service}
                    <li>{service}</li>
                    <br />
                {/each}
            </div>
        </div>
    {/if}
    {#if notIncludedServicesArray}
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <h3>Services not included</h3>
        </div>
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <div>
                {#each notIncludedServicesArray as service}
                    <li>{service}</li>
                    <br />
                {/each}
            </div>
        </div>
    {/if}
    {#if data.location.latitude && data.location.longitude}
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <h3>Location</h3>
        </div>
        <div class="experience__row__generic">
            <Map lat={data.location.latitude} lng={data.location.longitude} />
        </div>
    {/if}
    <div class="experience__row__horizontal__padding experience__row__generic">
        <div class="centered-content">
            {#if !deleteMode}
                <button
                    class="main-button delete-button delete-mode-button"
                    on:click={() => {
                        deleteMode = true;
                    }}>Delete</button
                >
            {:else}
                <button
                    class="secondary-button delete-mode-button"
                    on:click={() => {
                        deleteMode = false;
                    }}>Cancel</button
                >
                {#if deleteInputValue === "delete"}
                    <button
                        class="main-button delete-button delete-mode-button"
                        on:click={() => deleteExperience()}>Delete</button
                    >
                {/if}
            {/if}
        </div>
    </div>
    {#if deleteMode}
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <div class="centered-content">
                <Input
                    label={"Write delete to confirm your action."}
                    onChange={(e) => {
                        deleteInputValue = e.target.value;
                        console.log(deleteInputValue);
                    }}
                    value=""
                />
            </div>
        </div>
    {/if}
</div>

<style>
    .experience__container {
        width: 100%;
        margin-top: 20px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .experience__row__generic {
        width: 100%;
        margin-top: 10px;

        display: flex;
        flex-direction: row;
        align-items: center;

        font-size: 18px;
    }

    .experience__row__horizontal__padding {
        padding-left: 20px;
        padding-right: 20px;
    }

    .experience__row__section {
        margin-right: 10px;
        display: flex;
        flex-direction: row;
    }
    .experience__row__section > i {
        margin-right: 5px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .centered-content {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .delete-button {
        font-size: 18px;
        background-color: red;
    }
    .delete-mode-button {
        width: 140px;
        height: 45px;
        margin: 0px 5px;
    }
</style>
