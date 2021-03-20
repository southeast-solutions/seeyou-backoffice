<script>
    // Props
    export let items = [
        "https://forums-images.oneplus.net/attachments/904/904853-921c9e6f5c245ddc35fa4c415bdc3ac8.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43qLkUDZv9TrvcQ5KzbLM-DNNFEfscamM1Q&usqp=CAU",
        "https://img.lovepik.com/photo/50121/7345.jpg_wh860.jpg",
        "https://forums-images.oneplus.net/attachments/904/904853-921c9e6f5c245ddc35fa4c415bdc3ac8.png",
        "https://forums-images.oneplus.net/attachments/904/904853-921c9e6f5c245ddc35fa4c415bdc3ac8.png",
    ];
    export let scrollBy = 1;

    const paginationFactor = 504;
    const totalPaginationPixels = scrollBy * paginationFactor;

    $: offset = 0;
    $: atStart = offset === 0;
    $: atEnd = offset <= paginationFactor * (items.length - scrollBy) * -1;

    const move = (direction) => {
        if (direction > 0 && !atEnd) {
            offset -= totalPaginationPixels;
        } else if (direction < 0 && !atStart) {
            offset += totalPaginationPixels;
        }
    };
</script>

<div class="content-container">
    <main>
        <div class="items" style="transform: translateX({offset}px);">
            {#each items as item, i}
                <img class="item" src={item} alt="i" />
            {/each}
        </div>
    </main>
    <div class="controls-container">
        <button disabled={atStart} on:click={() => move(-1)}
            ><i class="fi  fi-rr-angle-left" /></button
        >
        <button disabled={atEnd} on:click={() => move(1)}
            ><i class="fi fi-rr-angle-right" /></button
        >
    </div>
</div>

<style>
    .content-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    main {
        width: 100%;
        overflow: hidden;
    }

    .items {
        display: flex;
        transition: transform 0.4s ease-in-out;
        transform: translateX(0px);
    }

    .items > img {
        min-width: 500px;
        height: 300px;
        margin: 0 4px;
        border-radius: 5px;
        user-select: none;
        overflow: hidden;
        object-fit: cover;
        z-index: 1;
    }

    .items .item:first-child {
        margin-left: 0;
    }

    .items .item:last-child {
        margin-right: 0;
    }
    .controls-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: absolute;
        width: 100%;
    }
    .controls-container > button {
        position: relative;
        height: 300px;
        background-color: rgba(0, 0, 0, 0.3);
        border: none;
        color: white;
        width: 50px;
        border-radius: 5px;
    }
</style>
