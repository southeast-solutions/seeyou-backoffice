<script>
    $: ({ id, ...textAreaProps } = $$props);
    $:focused = false;
    $:labelClass = focused ? "textarea__label--focused" : "textarea__label";
</script>

<div>
    <div class="textarea-wrapper">
          <div class={labelClass}>
            {textAreaProps.label || 'Test Label'}
          </div>

        <div class="textarea">
          <textarea
            class={!focused ? "textarea__field" : "textarea__field textarea__field--focused"}
            on:focus={() => {focused = true;}}
            on:blur={() => {focused = false;}}
            value={textAreaProps.value || ''}
            rows={textAreaProps.rows}
            placeholder={textAreaProps.placeholder || ''}
            autoCorrect={'off'}
            maxLength={textAreaProps.maxLength || 2000}
          />
        </div>
      </div>
</div>

<style>

.textarea {
    width: 100%;
    position: relative;
    display: flex;
    height: auto;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 8px;
}

.textarea__field {
    margin-top: 5px;
    outline: none;
    border: 1px #54709c solid;
    line-height: 1.25;
    font-size: 15px;
    background-color: transparent;
    resize: none;
    padding: 0;
}

.textarea__field--focused {
    border: 1px #019af6 solid !important;
}


.textarea__label {
    color: #54709c;
    font-size: 15px;
}
  

.textarea__label--focused {
  color: #019af6;
  top: 0;
  width: 100%;
  cursor: pointer;
  margin-bottom: 2px;
}







</style>