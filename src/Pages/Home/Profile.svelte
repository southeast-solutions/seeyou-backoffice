<script>
    import { onMount } from "svelte";
    import PageLoader from "./PageLoader.svelte";
    import Input from '../../SharedComponents/Input.svelte';
    import {
        guardSignedUser,
        clearAuthLocalStorage,
    } from "../../Services/AuthService";
    import { getUserData } from "../../Services/ProfileService";
    import NavBar from "./NavBar.svelte";
    import { 
        tourOperator, 
        promoter, 
        contentCreator, 
        concierge 
    } from "../../Enums/UserTypes";

    let user = undefined;

    onMount(async () => {
        guardSignedUser();
        user = await getUserData("abc");
    });

    let userInfo = {
        firstName: '',
        lastName: '',
    }

    console.log(userInfo)
</script>

<svelte:head>
    <title>Profile</title>
</svelte:head>
<NavBar />


<div class="home-page-container">

<Input hasErr={false} name="pla" onChange={() => console.log("typing....")} />

    {#if user}
        <div class="right-row">
            <button
                class="main-button sign-out-button"
                on:click={clearAuthLocalStorage}>Sign out</button
            >
        </div>
        <div class="left-row"><h1>Profile</h1></div>
        <div class="center-row">
            <div class="profile-picture-button">
                {#if user.profileUrl}
                    <img
                        class="profile-picture-image"
                        src={user.profileUrl}
                        alt="profilePicture"
                    />
                {:else}
                    <i class="fi fi-rr-user" />
                {/if}
            </div>
        </div>
        {#if user.firstName && user.lastName}
            <div class="center-row">
                <div class="form-row">
                    <div class="half-row">
                    <Input  label={'First name'} value={userInfo.firstName} className="half-row" name="pla" onChange={(e) => {userInfo['firstName'] = e.target.value; console.log(userInfo);}} />
                    </div>
                    <div class="half-row">
                    <Input hasErr={false} label={'Last name'} className="half-row" name="pla" onChange={(e) => userInfo['lastName'] = e.target.value} />
                    </div>
                </div>
            </div>
        {/if}

        {#if user.phoneNumber && user.city}
            <div class="center-row">
                <div class="form-row">
                    <div class="half-row">
                        <Input  label={'Phone number'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                    <div class="half-row">
                        <Input  label={'City'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                </div>
            </div>
        {/if}

        {#if user.country && user.foreignLanguages}
            <div class="center-row">
                <div class="form-row">
                    <div class="half-row">
                        <Input  label={'Country'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                    <div class="half-row">
                        <Input  label={'Foreign Languages'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                </div>
            </div>
        {/if}

        {#if user.userType == tourOperator}
            {#if user.business.businessName && user.business.website}
            <div class="center-row">
                <div class="form-row">
                    <div class="half-row">
                        <Input  label={'Business Name'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                    <div class="half-row">
                        <Input  label={'Business Website'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                </div>
            </div>
            {/if}
            {#if user.business.cui && user.business.address}
            <div class="center-row">
                <div class="form-row">
                    <div class="half-row">
                        <Input  label={'Cui'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                    <div class="half-row">
                        <Input  label={'Adress'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                </div>
            </div>
            {/if}
            {#if user.business.socialLinks}
            <div class="center-row">
                <div class="form-row">
                    <div class="half-row">
                        <Input  label={'Social Links'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                </div>
            </div>
            {/if}
        {/if}

        {#if user.userType == promoter}
            {#if user.currentJob && user.socialLinks}
            <div class="center-row">
                <div class="form-row">
                    <div class="half-row">
                        <Input  label={'Current Job'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                    <div class="half-row">
                        <Input  label={'Social Links'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                </div>
            </div>
            {/if}
            {#if user.disponibilityDescription}
            <div class="center-row">
                <div class="form-row">
                    <Input  label={'Disponibility Description'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                </div>
            </div>
            {/if}
        {/if}
        {#if user.userType == contentCreator}
            {#if user.socialLinks && user.disponibilityDescription}
            <div class="center-row">
                <div class="form-row">
                   <div class="half-row">
                        <Input  label={'Social Links'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                    <div class="half-row">
                        <Input  label={'Disponibility Description'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                    </div>
                </div>
            </div>
            {/if}
        {/if}
        {#if user.userType == concierge}
            {#if user.socialLinks}
            <div class="center-row">
                <div class="form-row">
                        <Input  label={'Social Links'} className="half-row" name="pla" onChange={() => console.log("typing....")} />
                </div>
            </div>
            {/if}
        {/if}
    {:else}
        <PageLoader />
    {/if}
</div>

<style>
    h1 {
        font-size: 52px;
        font-weight: 300;
    }
    .home-page-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .right-row {
        margin-top: 10px;
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .sign-out-button {
        height: 50px;
        width: 150px;
        font-size: 24px;
        font-weight: 200;
    }

    .left-row {
        width: 100%;
        width: 90%;
        display: flex;
        flex-direction: row;

        justify-content: flex-start;
        align-items: center;
    }

    .center-row {
        width: 100%;
        width: 90%;
        display: flex;
        flex-direction: row;
        margin-top: 20px;

        justify-content: center;
        align-items: center;
    }

    .form-row {
        margin-bottom: 5px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    
    .half-row {
        width: 45%;
    }

    /* .half */
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
    .profile-picture-button > i {
        color: white;
        font-size: 42px;
    }
</style>
