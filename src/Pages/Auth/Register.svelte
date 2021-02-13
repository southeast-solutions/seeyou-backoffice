<script>
    const userTypes = [
        {
            id: 1,
            name: "Promoter",
            description:
                "Promote incredible experiences and grow the SeeYouRomania userbase",
        },
        {
            id: 2,
            name: "Tour operator",
            description:
                "Promote incredible experiences and grow the SeeYouRomania userbase",
        },
        {
            id: 3,
            name: "Content creator",
            description:
                "Promote incredible experiences and grow the SeeYouRomania userbase",
        },
        {
            id: 4,
            name: "Concierge",
            description:
                "Promote incredible experiences and grow the SeeYouRomania userbase",
        },
    ];

    $: selectedTypeId = 1;

    const typeSelectorClicked = (id) => {
        selectedTypeId = id;
    };
</script>

<div class="page-container">
    <div class="form-container">
        <div class="inputs-container">
            <button class="secondary-button back-button">Cancel</button>
            <h2>Register as</h2>
            {#each userTypes as type}
                <div
                    class="type-selector {selectedTypeId === type.id
                        ? 'selector-selected'
                        : ''}"
                    on:click={() => typeSelectorClicked(type.id)}
                >
                    <div class="selector-title">
                        {type.name}
                    </div>
                    <div class="selector-description">
                        {type.description}
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="info-container" />
</div>

<style>
    .page-container {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: row;
    }
    .form-container {
        overflow-y: auto;
        height: 100%;
        width: 40%;
        background-color: #e8e7e2;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
    }
    .info-container {
        height: 100%;
        width: 60%;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        padding: 0 40px;
        overflow-y: auto;
    }

    h2 {
        color: #223d4f;
        font-weight: 300;
        font-size: 32px;
        margin-top: 10px;
    }

    .inputs-container {
        width: 80%;
        margin-top: 30px;
    }
    .type-selector {
        transition: 0.5s;
        padding: 5px 10px;
        width: 100%;
        height: 150px;
        color: #549c79;
        border: 1px solid #549c79;
        margin-top: 10px;
        margin-bottom: 10px;
        user-select: none;
        cursor: pointer;
    }
    .type-selector:hover {
        background-color: white;
    }
    .selector-title {
        font-weight: bold;
        font-size: 28px;
    }
    .selector-description {
        font-size: 24px;
        font-weight: 300;
    }
    .selector-selected {
        background-color: #549c79;
        color: white;
    }
    .selector-selected:hover {
        background-color: #549c79;
        color: white;
    }

    .back-button {
        height: 40px;
        width: 80px;
        font-size: 16px;
    }
</style>
