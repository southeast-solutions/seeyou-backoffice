<script>
    import { onMount, afterUpdate } from "svelte";

    import { vacation } from "../../../Enums/ExperienceTypes";
    import Map from "./Map.svelte";
    import Carousel from "./Carousel.svelte";

    export let data;

    let dateObj;
    let includedServicesArray;
    let notIncludedServicesArray;
    let photos;

    onMount(() => {
        processProps();
    });

    afterUpdate(() => {
        processProps();
    });

    const processProps = () => {
        dateObj = undefined;
        includedServicesArray = undefined;
        notIncludedServicesArray = undefined;
        photos = undefined;
        console.log(data);

        if (data.dateTime) {
            dateObj = new Date(data.dateTime);
        }

        if (Array.isArray(data.includedServices)) {
            includedServicesArray = data.includedServices;
        }
        if (Array.isArray(data.notIncludedServices)) {
            notIncludedServicesArray = data.notIncludedServices;
        }
        if (Array.isArray(data.photos)) {
            photos = data.photos;
        }
    };
</script>

<div class="experience__container">
    {#if photos}
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <Carousel items={photos} />
        </div>
    {/if}

    <div class="experience__row__horizontal__padding experience__row__generic">
        <h1>{data.title}</h1>
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
    {#if data.highlights}
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <h3>Highlights</h3>
        </div>
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            {data.highlights}
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
    {#if data.physicalLocation.latitude && data.physicalLocation.longitude}
        <div
            class="experience__row__horizontal__padding experience__row__generic"
        >
            <h3>Location</h3>
        </div>
        <div class="experience__row__generic">
            <Map
                lat={data.physicalLocation.latitude}
                lng={data.physicalLocation.longitude}
            />
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
</style>
