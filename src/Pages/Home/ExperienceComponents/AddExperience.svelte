<script>
    import TimePicker from "svelte-time-picker";

    /* Callback */
    let myCallback = (event) => {
        let date = event.detail;
        // ...
    };
</script>

<TimePicker on:change={myCallback} />
