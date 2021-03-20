<script>
import { onMount } from "svelte";
import { navigate } from "svelte-routing";
import {guardUnsignedUser} from "../../Services/AuthService";
import AccountTypeSelection from "./FormComponents/AccountTypeSelection.svelte";
import { registerSectionAccTypes } from '../../Enums/UserTypes';
import PromoterSection from "./FormComponents/PromoterSection.svelte";
import TourBusinessSection from "./FormComponents/TourBusinessSection.svelte";
import TourOperatorSection from "./FormComponents/TourOperatorSection.svelte";
import ContentCreator from "../Home/UserInfo/ContentCreator.svelte";
import ContentCreatorSection from "./FormComponents/ContentCreatorSection.svelte";
import ConciergeSection from "./FormComponents/ConciergeSection.svelte";

$:selectedAccount = registerSectionAccTypes[0];

onMount(() => {
        guardUnsignedUser();
    });

const onAccountTypeSelectionChange = (selection) => {
    selectedAccount = selection;
};

const onConciergeData = (event) => {
        conciergeData = event.detail;
        registrationHasErrors = false;
    };

const onPromoterData = (event) => {
    promoterData = event.detail;
};

const onContentCreatorData = (event) => {
        contentCreatorData = event.detail;
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



</script>

<div class="page-container">
    <div class="register-wrapper">
        <div class="register-wrapper__account-type-selection">
            <AccountTypeSelection selectedAccount={selectedAccount} onChangeSelection={onAccountTypeSelectionChange}/>
        </div>

        <div class="register-wrapper__form-section">

            {#if selectedAccount === registerSectionAccTypes[0]}
                    <PromoterSection
                    on:validSection={onPromoterData}
                />
            {/if}

            {#if selectedAccount === registerSectionAccTypes[1]}
            <TourBusinessSection
            on:validSection={onTourOperatorData}
            />
            <TourOperatorSection
            on:validSection={onTourOperatorData}
            />
            {/if}

            {#if selectedAccount === registerSectionAccTypes[2]}
                    <ContentCreatorSection
                    on:validSection={onContentCreatorData} />
            {/if}

            {#if selectedAccount === registerSectionAccTypes[3]}
                    <ConciergeSection
                    on:validSection={onConciergeData}/>
            {/if}
        </div>

        </div>
        <div>
         
    </div>
</div>

<style>
.page-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #cccccc;
    background-image: url('https://images.freecreatives.com/wp-content/uploads/2016/03/21074431/Tehran-Persia-Travel-Wallpaper.jpg');
    background-repeat: no-repeat, repeat;
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
}

.register-wrapper {
    height: 85%;
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background-color: white;
    opacity: 0.97;
    border-radius: 5px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
    min-width: 600px;
}

.register-wrapper__account-type-selection {
    width: 30%;
    height: 100%;
}

.register-wrapper__form-section {
    width: 100%;
    padding: 30px 60px 30px 60px;
    overflow-y: scroll
}

.register-wrapper__form-section::-webkit-scrollbar {
  display: none;
}
</style>