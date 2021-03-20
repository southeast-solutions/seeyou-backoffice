<script>
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let maxPhotos = 10;

    const dispatch = createEventDispatcher();

    $: files = [];
    let allFiles = [];
    let showImages = [];

    $: {
        allFiles.push(...Array.from(files));
        allFiles = allFiles.slice(0, maxPhotos);
        console.log(allFiles);
        showImages = allFiles.map((file) => URL.createObjectURL(file));
        files = [];
        dispatch("imagesChanged", allFiles);
    }

    const removeIndex = (index) => {
        allFiles.pop(index);
        showImages.pop(index);
        showImages = showImages;
    };
</script>

<div class="form-row">
    <div class="full-row photo-row">
        {#each showImages as image, index}
            <div class="photo-card" transition:fly={{ y: 200, duration: 500 }}>
                <img src={image} alt="local-img" class="photo-content" />
                <div class="delete-button" on:click={() => removeIndex(index)}>
                    Delete
                </div>
            </div>
        {/each}
        {#if allFiles.length < maxPhotos}
            <label>
                <div class="photo-card pressable">
                    <i class="fi fi-rr-plus-small" />
                </div>
                <input type="file" accept="image/*" bind:files multiple />
            </label>
        {/if}
    </div>
</div>

<style>
    .photo-card {
        width: 280px;
        height: 280px;
        background-color: #e8e7e2;
        border-radius: 10px;

        display: flex;
        justify-content: center;
        align-items: center;
        color: #8a8988;
        margin-right: 15px;
        position: relative;
    }
    .pressable {
        cursor: pointer;
    }
    .photo-card > i {
        font-size: 72px;
        font-weight: 200;
    }
    input[type="file"] {
        display: none;
    }
    .photo-content {
        image-rendering: optimizeQuality;
        width: 280px;
        height: 280px;
        object-fit: cover;
        border-radius: 10px;
    }

    .photo-row {
        /* width: 100%; */
        overflow-y: auto;
        display: flex;
        flex-direction: row;
    }
    .delete-button {
        position: absolute;
        top: 0;
        right: 0;
        height: 30px;
        width: 60px;
        border-radius: 0 10px 0 0;
        color: white;
        background-color: rgba(214, 51, 51, 0.747);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 200;
        user-select: none;
        cursor: pointer;
    }
</style>
