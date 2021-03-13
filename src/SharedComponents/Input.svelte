<script>
     $: ({ id, ...inputProps } = $$props);

    console.log($$props)
</script>

    <div class={`input__field ${inputProps.className ? inputProps.className : ''}`} >
       
        <input 
            class={`input ${inputProps.hasErr ? 'input--has-error' : ''}`}
            type="text"
            on:change={(value) => inputProps.onChange(value)}
            placeholder={inputProps.placeholder}
            autoCorrect="off"
            autoComplete="nope"
            on:
            />

        {#if inputProps.label}
        <span class={`input__label ${inputProps.hasErr ? 'input-label--has-error' : ''}`}>
            {inputProps.label}
        </span>
        {/if}

        {#if inputProps.hasErr && inputProps.errMessage.length}
        <span class="input__err-message">
            {inputProps.errMessage}
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

input {
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
    bottom: -12px;
    font-size: 12px;
    color: #b60610;
}

</style>