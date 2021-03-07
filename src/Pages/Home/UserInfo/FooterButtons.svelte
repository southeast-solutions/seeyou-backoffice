<script>
    export let id;

    const verifyCallback = () => {};
    const deleteCallback = () => {};
</script>

{#if id}
    <div class="end-row">
        <button class="main-button" on:click={verifyCallback}>Verify</button>
        <button class="secondary-button" on:click={deleteCallback}
            >Delete</button
        >
    </div>
{/if}

<style>
    .end-row {
        margin-top: 15px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    button {
        height: 40px;
        width: 100px;
        font-size: 20px;
        font-weight: 200;
        margin-left: 10px;
    }

    .secondary-button:hover {
        background-color: red;
        border: none;
    }
</style>
