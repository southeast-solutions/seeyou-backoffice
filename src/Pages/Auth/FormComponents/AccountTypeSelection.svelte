<script>
    import { onMount } from 'svelte';
    import { registerSectionAccTypes } from '../../../Enums/UserTypes';
    $: ({ id, ...accountTypeSelectionProps } = $$props);
    console.log($$props);
</script>

<div class="account-type-selection__wrapper">
    {#each registerSectionAccTypes as accType}
    <div class={`account-type-selection__card ${accType === accountTypeSelectionProps.selectedAccount ? 
            'account-type-selection__card--selected' : ''}`} 
            on:click={() => accountTypeSelectionProps.onChangeSelection(accType)}>
            
            <div class="account-type-selection-card__name">
                {accType.name}
            </div>

            <div class="account-type-selection-card__description">
                {accType.description}
            </div>

        </div>
    {/each}
</div>

<style>
.account-type-selection__wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.account-type-selection__card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content;
    flex: 4;
    text-align: center;
    padding-left: 16px;
    padding-right: 16px;
    box-shadow: -1px 8px 5px -3px rgba(184,184,184,0.75);
    -webkit-box-shadow: -1px 8px 5px -3px rgba(184,184,184,0.75);
    -moz-box-shadow: -1px 8px 5px -3px rgba(184,184,184,0.75);
}

.account-type-selection__card:hover {
    background-color: #ffffff;
    background-image: linear-gradient(315deg, #ffffff 0%, #5899e2 74%);
    opacity: 0.9;
    transition: all 0.3s ease;
}

.account-type-selection__card:hover>div {
    color: white;
    transition: all 0.3s ease;
}

.account-type-selection__card--selected {
    background-color: #36096d !important;
    background-image: linear-gradient(315deg, #36096d 0%, #37d5d6 74%)!important;
    transition: all 0.3s ease;
}

.account-type-selection__card--selected>div {
    color: white !important;
}

.account-type-selection__card:last-child {
    border-bottom: none !important
}

.account-type-selection-card__name {
    font-size: 20px;
    font-weight: bolder;
    color: #54709c;
}

.account-type-selection-card__description {
    margin-top: 8px;
    font-size: 17px;
    color: #54709c;
    font-weight: 500;
}

</style>