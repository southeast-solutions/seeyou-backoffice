<script>
import { navigate } from 'svelte-routing';
import { onMount } from "svelte";
import {guardUnsignedUser, register, validation} from "../../Services/AuthService";
import AccountTypeSelection from "./FormComponents/AccountTypeSelection.svelte";
import { registerSectionAccTypes } from '../../Enums/UserTypes';
import PromoterSection from "./FormComponents/PromoterSection.svelte";
import TourBusinessSection from "./FormComponents/TourBusinessSection.svelte";
import TourOperatorSection from "./FormComponents/TourOperatorSection.svelte";
import ContentCreatorSection from "./FormComponents/ContentCreatorSection.svelte";
import ConciergeSection from "./FormComponents/ConciergeSection.svelte";

$:selectedAccount = registerSectionAccTypes[0];

$:promoterData = {};
$:contentCreatorData = {}
$:conciergeData = {}
$:tourBusinessData = {}
$:tourOperatorData = {}

$:registerData = {
    promoterData: promoterData,
    contentCreatorData: contentCreatorData,
    conciergeData: conciergeData,
    tourBusinessData: tourBusinessData,
    tourOperatorData: tourOperatorData,
}

$:registerValidationData = {
    promoterDataValidation: {},
    tourBusinessDataValidation: {},
    tourOperatorDataValidation: {},
    conciergeDataValidation: {},
    contentCreatorDataValidation: {},
}

onMount(() => {
        guardUnsignedUser();
    });

const onAccountTypeSelectionChange = (selection) => {
    selectedAccount = selection;
    promoterData = {};
    contentCreatorData = {};
    conciergeData = {};
    tourBusinessData = {};
    tourOperatorData = {};
};

const onConciergeData = (event) => {
    conciergeData = event.detail;
};

const onPromoterData = (event) => {
    promoterData = event.detail;
};

const onContentCreatorData = (event) => {
        contentCreatorData = event.detail;
};

const onTourBusinessData = (event) => {
        tourBusinessData = event.detail;
    };

const onTourOperatorUserData = (event) => {
    tourOperatorData = event.detail;
}

const validationWrapper = async () => {
registerValidationData = {
    promoterDataValidation: {},
    tourBusinessDataValidation: {},
    tourOperatorDataValidation: {},
    conciergeDataValidation: {},
    contentCreatorDataValidation: {},
}
   const validationRes = validation(registerData, selectedAccount);
    if(validationRes.validationStatus === 1) {
        const registerRes = await register(registerData,selectedAccount)
        if (registerRes.success) {
            navigate('/confirm-account');
        }
        return;
    }

   if(validationRes.promoterDataValidation) {
        registerValidationData.promoterDataValidation = validationRes.promoterDataValidation;
   }

   if(validationRes.tourBusinessDataValidation) {
       registerValidationData.tourBusinessDataValidation = validationRes.tourBusinessDataValidation;
   }

   if(validationRes.tourOperatorDataValidation) {
       registerValidationData.tourOperatorDataValidation = validationRes.tourOperatorDataValidation;
   }


   if(validationRes.contentCreatorDataValidation) {
       registerValidationData.contentCreatorDataValidation = validationRes.contentCreatorDataValidation;
   }

   if(validationRes.conciergeDataValidation) {
       registerValidationData.conciergeDataValidation = validationRes.conciergeDataValidation;
   }
}


</script>

<div class="page-container">
    <div class="register-wrapper">
        <div class="register-wrapper__account-type-selection">
            <AccountTypeSelection selectedAccount={selectedAccount} onChangeSelection={onAccountTypeSelectionChange}/>
        </div>

        <div class="register-wrapper__form-section">

            {#if selectedAccount === registerSectionAccTypes[0]}
                <PromoterSection
                    registerValidationData={registerValidationData}
                    on:completeData={onPromoterData}
                />
            {/if}

            {#if selectedAccount === registerSectionAccTypes[1]}
                <TourBusinessSection
                    registerValidation={registerValidationData}
                    on:completeData={onTourBusinessData}
            />
                <TourOperatorSection
                    registerValidation={registerValidationData}
                    on:completeData={onTourOperatorUserData}
            />
            {/if}

            {#if selectedAccount === registerSectionAccTypes[2]}
                    <ContentCreatorSection
                    registerValidation={registerValidationData}
                    on:completeData={onContentCreatorData} />
            {/if}

            {#if selectedAccount === registerSectionAccTypes[3]}
                    <ConciergeSection
                    registerValidation={registerValidationData}
                    on:completeData={onConciergeData}/>
            {/if}
            <button class="main-button cta-button" on:click={() => validationWrapper()}>Register</button>
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
    min-width: 800px;
}

.register-wrapper__account-type-selection {
    width: 30%;
    height: 100%;
}

.register-wrapper__form-section {
    width: 100%;
    padding: 30px 60px 30px 60px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.register-wrapper__form-section::-webkit-scrollbar {
  display: none;
}

.cta-button {
        margin-top: 20px;
        border-radius: 5px;
        align-self: flex-end;
        width: 100px;
        font-size: 16px;
        padding: 10px;
    }
</style>