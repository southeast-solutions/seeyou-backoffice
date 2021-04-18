<script>
    import { afterUpdate } from "svelte";

    $: updatedProps = {};
    afterUpdate(() => {
        updatedProps = $$props;
    });
</script>

<div
    class={`input__field ${
        updatedProps.className ? updatedProps.className : ""
    }`}
>
    <input
        class={`input ${updatedProps.hasError ? "input--has-error" : ""}`}
        type={updatedProps.type}
        on:change={(value) => updatedProps.onChange(value)}
        placeholder={updatedProps.placeholder}
        value={updatedProps.value}
        autoCorrect="off"
        autoComplete="off"
        disabled={updatedProps.disabled}
    />

    {#if updatedProps.label}
        <span
            class={`input__label ${
                updatedProps.hasError ? "input-label--has-error" : ""
            }`}
        >
            {updatedProps.label}
            {#if updatedProps.mandatory}
                <span class="mandatory"> * </span>
            {/if}
        </span>
    {/if}

    {#if updatedProps.hasError && updatedProps.errMessage.length}
        <span class="input__err-message">
            {updatedProps.errMessage}
        </span>
    {/if}
</div>

<style>
    .input__field {
        width: 100%;
        position: relative;
        margin-bottom: 8px;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px transparent inset;
        box-shadow: 0 0 0px 1000px transparent inset;
        transition: background-color 5000s ease-in-out 0s;
    }

    input {
        /* font-family: 'Segoe UI'; */
        height: 100%;
        width: 100%;
        padding-left: 0;
        padding-right: 0;
        position: relative;
        border-bottom: solid 2px #54709c;
        box-shadow: none;
        background-color: transparent;
        z-index: 1;
        outline: none;
        font-size: 14px;
    }
    input:disabled {
        background-color: rgba(0, 0, 0, 0.05);
    }

    input:-webkit-autofill:active {
        box-shadow: 0 0 0 30px white inset !important;
        -webkit-box-shadow: 0 0 0 30px white inset !important;
    }

    input:focus {
        border: none !important;
        border-bottom: 2px solid #019af6 !important;
    }

    .input--has-error {
        border-bottom-color: #b60610 !important;
    }
    .input--has-error:focus {
        border-bottom-color: #b60610 !important;
    }

    .input__label {
        transition: 0.2s;
        top: -14px;
        position: absolute;
        font-weight: normal;
        padding-bottom: 0;
        color: #54709c;
        font-size: 14px;
    }

    .input__field input:focus + .input__label {
        font-size: 12px;
        color: #019af6;
    }

    .input-label--has-error {
        color: #b60610 !important;
    }

    .input__err-message {
        position: absolute;
        bottom: -20px;
        font-size: 12px;
        color: #b60610;
    }

    .mandatory {
        color: red;
    }
</style>
