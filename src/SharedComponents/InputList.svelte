<script>
    import { createEventDispatcher } from "svelte";
    import Input from "./Input.svelte";

    export let maxLength = 10;
    export let placeholder = "";

    const dispatch = createEventDispatcher();

    $: values = [""];

    const removeClicked = () => {
        if (values.length > 1) {
            values.pop();
            values = values;
            notifyValue();
        }
    };
    const addClicked = () => {
        if (values.length < maxLength) {
            values = [...values, ""];
            notifyValue();
        }
    };
    const changeValue = (index, value) => {
        values[index] = value;
        notifyValue();
    };
    const notifyValue = () =>
        dispatch(
            "valueChanged",
            values.filter((text) => text !== "")
        );
</script>

{#each values as value, index}
    <div class="form-row">
        <div class="full-row">
            <Input
                label={placeholder}
                className="half-row"
                {value}
                name="pla"
                onChange={(event) => changeValue(index, event.target.value)}
            />
        </div>
        {#if index === values.length - 1}
            {#if index !== 0}
                <button class="secondary-button" on:click={removeClicked}
                    ><i class="fi fi-rr-cross-small" /></button
                >
            {/if}
            {#if index !== maxLength - 1}
                <button class="secondary-button" on:click={addClicked}
                    ><i class="fi fi-rr-plus-small" /></button
                >
            {/if}
        {/if}
    </div>
{/each}

<style>
    .form-row > .secondary-button {
        margin-left: 10px;
        padding: 0;
        border-radius: 15px;

        height: 30px;
        min-width: 30px;
        display: flex;
        align-items: center;
        align-content: center;
    }
    i {
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
    }
</style>
