<script>
    export let user;
    export let isAdmin = false;

    import { onMount } from "svelte";
    import FooterButtons from "./FooterButtons.svelte";
    let proccessedSocialLinks = undefined;

    onMount(() => {
        if (user.socialLinks) {
            proccessedSocialLinks = user.socialLinks
                .replace(",", "")
                .replace("https://www.", "")
                .split("\n")
                .filter(Boolean)
                .map((str) => str.trim());
        }
    });
</script>

<div class="content-container">
    <div class="content-row">
        <div class="full-row">
            <h3>{isAdmin ? "Admin" : "Concierge"}</h3>
        </div>
    </div>
    {#if user.firstName && user.lastName}
        <div class="content-row">
            <div class="full-row">
                Full name: {user.firstName}
                {user.lastName}
            </div>
        </div>
    {/if}
    {#if user.email && user.phoneNumber}
        <div class="content-row">
            <div class="full-row">
                Email: <a href="mailto:{user.email}">{user.email}</a>
                Phone number: {user.phoneNumber}
            </div>
        </div>
    {/if}
    {#if user.city && user.country}
        <div class="content-row">
            <div class="full-row">
                Location: {user.city}, {user.country}
            </div>
        </div>
    {/if}
    {#if user.foreignLanguages}
        <div class="content-row">
            <div class="full-row">
                Foreign languages: {user.foreignLanguages}
            </div>
        </div>
    {/if}
    {#if proccessedSocialLinks}
        <div class="content-row">
            <div class="full-row">
                Social links: {#each proccessedSocialLinks as link}
                    <a href="//{link}">{link}</a> &nbsp;
                {/each}
            </div>
        </div>
    {/if}
    {#if !isAdmin}
        <div class="content-row">
            <FooterButtons
                id={user.id}
                verified={user.verified}
                on:verified={() => {
                    user.verified = !user.verified;
                }}
            />
        </div>
    {/if}
</div>

<style>
    .content-container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .content-row {
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    div {
        font-size: 18px;
    }
</style>
