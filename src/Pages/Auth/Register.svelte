<script>
    import { navigate } from "svelte-routing";
    import { fade } from "svelte/transition";
    import PromoterSection from "./FormComponents/PromoterSection.svelte";
    import TourOperatorSection from "./FormComponents/TourOperatorSection.svelte";
    import TourBusinessSection from "./FormComponents/TourBusinessSection.svelte";
    import ContentCreatorSection from "./FormComponents/ContentCreatorSection.svelte";
    import ConciergeSection from "./FormComponents/ConciergeSection.svelte";
    import { onMount } from "svelte";
    import { register, guardUnsignedUser } from "../../Services/AuthService";
    import {
        promoter,
        concierge,
        tourOperator,
        contentCreator,
    } from "../../Enums/UserTypes";
    const userTypes = [
        {
            id: promoter,
            name: "Promoter",
            description:
                "Promote incredible experiences and grow the SeeYouRomania userbase",
        },
        {
            id: tourOperator,
            name: "Tour operator",
            description:
                "Promote incredible experiences and grow the SeeYouRomania userbase",
        },
        {
            id: contentCreator,
            name: "Content creator",
            description:
                "Promote incredible experiences and grow the SeeYouRomania userbase",
        },
        {
            id: concierge,
            name: "Concierge",
            description:
                "Promote incredible experiences and grow the SeeYouRomania userbase",
        },
    ];

    let errorMessage = "Email of invalid type";

    let promoterData = undefined;
    let tourOperatorData = undefined;
    let tourBusinessData = undefined;
    let contentCreatorData = undefined;
    let conciergeData = undefined;

    let registrationHasErrors = true;

    onMount(() => {
        guardUnsignedUser();
    });

    $: selectedTypeId = promoter;
    const cancelClicked = () => {
        navigate("/login");
    };
    const typeSelectorClicked = (id) => {
        selectedTypeId = id;
        registrationHasErrors = true;
    };

    const onPromoterData = (event) => {
        promoterData = event.detail;
        registrationHasErrors = false;
    };
    const onTourOperatorData = (event) => {
        if (event.detail.cui) {
            tourBusinessData = event.detail;
        } else {
            tourOperatorData = event.detail;
        }
        if (tourBusinessData && tourOperatorData) {
            registrationHasErrors = false;
        }
    };
    const onContentCreatorData = (event) => {
        contentCreatorData = event.detail;
        registrationHasErrors = false;
    };
    const onConciergeData = (event) => {
        conciergeData = event.detail;
        registrationHasErrors = false;
    };

    const invalidateRegister = (_) => {
        registrationHasErrors = true;
    };

    const registerClicked = () => {
        let payload = undefined;
        switch (selectedTypeId) {
            case promoter:
                if (!promoterData) return;
                payload = promoterData;
                payload["userType"] = promoter;
                break;
            case tourOperator:
                if (!tourOperatorData || !tourBusinessData) return;
                payload = {
                    tourBusinessData,
                    tourOperatorData,
                    userType: tourOperator,
                };
                break;
            case contentCreator:
                if (!contentCreatorData) return;
                payload = contentCreatorData;
                payload["userType"] = contentCreator;
                break;
            case concierge:
                if (!conciergeData) return;
                payload = conciergeData;
                payload["userType"] = concierge;
                break;
            default:
                return;
        }

        register(payload);
        console.log(payload);
    };
</script>

<div class="page-container" in:fade>
    <div class="form-container">
        <div class="inputs-container">
            <button
                class="secondary-button back-button"
                on:click={cancelClicked}>Cancel</button
            >
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
    <div class="info-container">
        {#if selectedTypeId === promoter}
            <PromoterSection
                on:validSection={onPromoterData}
                on:notValid={invalidateRegister}
            />
        {/if}
        {#if selectedTypeId === tourOperator}
            <TourBusinessSection
                on:validSection={onTourOperatorData}
                on:notValid={invalidateRegister}
            />
            <TourOperatorSection
                on:validSection={onTourOperatorData}
                on:notValid={invalidateRegister}
            />
        {/if}
        {#if selectedTypeId === contentCreator}
            <ContentCreatorSection
                on:validSection={onContentCreatorData}
                on:notValid={invalidateRegister}
            />
        {/if}
        {#if selectedTypeId === concierge}
            <ConciergeSection
                on:validSection={onConciergeData}
                on:notValid={invalidateRegister}
            />
        {/if}
        {#if errorMessage !== ""}
            <div class="info-row error-message">
                {errorMessage}
            </div>
        {/if}

        <div class="info-row">
            <button
                class="main-button register-button"
                disabled={registrationHasErrors}
                on:click={registerClicked}>Register</button
            >
        </div>
    </div>
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
        align-items: center;
        padding: 0 50px;
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
        background-color: rgb(241, 241, 241);
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
    .info-row {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: flex-end;
    }
    .register-button {
        height: 40px;
        width: 120px;
        font-size: 20px;
        font-weight: 300 !important;
        margin-bottom: 20px;
    }
    .error-message {
        color: red;
        font-size: 18px;
        margin-bottom: 10px;
    }
</style>
