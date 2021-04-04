<script>
import { afterUpdate } from "svelte";
import { BASE_ROUTE } from "../Services/Constants";
 $: ({ id, ...profilePhotoProps } = $$props);

let imgSrc = $$props.profilePictureUrl ?  $$props.profilePictureUrl : '';


afterUpdate(() => {
    imgSrc = $$props.profilePictureUrl ? $$props.profilePictureUrl : '';
});


</script>

<div class="profile-photo-card">
    <input class="hidden-element" type="file" name="file" id="file" accept="image/*" on:change={() => profilePhotoProps.onChangeprofilePictureUrl()}>
 

    <div class="profile-picture-button">
        {#if imgSrc}
        <img
            class="profile-picture-image"
            src={imgSrc}
            alt="profilePicture"
        />
    {:else}
        <i class="fi fi-rr-user" />
    {/if}
    <div class="profile-photo-change__icon" on:click={() => {let element= document.querySelector('input[type="file"]'); element.click(); }}>C</div>
    <div class="profile-photo-save__icon" on:click={() => {profilePhotoProps.onUploadprofilePictureUrl(imgSrc) }}>S</div>

    </div>
    
    {#if profilePhotoProps.firstName && profilePhotoProps.lastName}
    <div class="profile-photo-card__strong-text">
        {profilePhotoProps.firstName} {profilePhotoProps.lastName}
    </div>
    {/if}

    {#if profilePhotoProps.email}
    <div class="profile-photo-card__standard-text">
        {profilePhotoProps.email}
    </div>
    {/if}

    {#if profilePhotoProps.city || profilePhotoProps.country || profilePhotoProps.phoneNumber}
    <div class="profile-photo-card__separator"/>
    {/if}

    {#if profilePhotoProps.city || profilePhotoProps.country}
    <div class="profile-photo-card__country-city">
        {profilePhotoProps.city} {profilePhotoProps.city && profilePhotoProps.country && ','} {profilePhotoProps.country}
    </div>
    {/if}

    {#if profilePhotoProps.phoneNumber}
    <div class="profile-photo-card__standard-text">
        {profilePhotoProps.phoneNumber}
    </div>
    {/if}

</div>

<style>

.hidden-element {
    display: none;
}

.profile-photo-card {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 16px;
}

.profile-picture-button {
    object-fit: cover;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 75px;
    height: 150px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
    background-color: #549c79;
    margin-bottom: 20px;
    position: relative;
}

.profile-picture-image {
    object-fit: cover;
    cursor: pointer;
    border-radius: 75px;
    height: 150px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.profile-photo-card__strong-text {
    font-size: 18px;
    color: #132d5e;
    font-weight: bold;
}

.profile-photo-card__country-city{
    font-size: 18px;
    color: #132d5e;
}

.profile-photo-card__standard-text {
    font-size: 16px;
    font-weight: normal;
    color: rgba(103, 127, 165, 0.4);
    margin-top: 5px;
}

.profile-photo-card__separator {
    height: 1px;
    width: 100%;
    background-color: rgba(84, 112, 156, 0.2);
    margin-top: 15px;
    margin-bottom: 15px;
}

.profile-photo-change__icon {
    position: absolute;
    right: 7px;
    bottom: 5px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #019af6;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}

.profile-photo-save__icon {
    position: absolute;
    right: -10px;
    bottom: 40px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #019af6;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}

</style>