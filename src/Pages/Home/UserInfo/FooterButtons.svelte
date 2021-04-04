<script>
    import { createEventDispatcher } from "svelte";

    import { verify } from "../../../Services/UsersService";
    export let id;
    export let verified = false;

    const dispatch = createEventDispatcher();

    const verifyCallback = async () => {
        await verify(id, !verified);
        dispatch("verified");
    };
</script>

{#if id}
    <div class="end-row">
        <button class="main-button" on:click={verifyCallback}
            >{verified ? "Unverify" : "Verify"}</button
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
</style>
