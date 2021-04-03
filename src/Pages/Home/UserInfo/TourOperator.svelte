<script>
    export let user;

    import { onMount } from "svelte";
    import FooterButtons from "./FooterButtons.svelte";
    let proccessedSocialLinks = undefined;
    let proccessedBusinessSocialLinks = undefined;

    onMount(() => {
        if (user.tourOperatorEntity.socialLinks) {
            proccessedSocialLinks = user.tourOperatorEntity.socialLinks
                .replace(",", "")
                .replace("https://www.", "")
                .split("\n")
                .filter(Boolean)
                .map((str) => str.trim());
        }
        if (user.tourBusinessEntity.socialLinks) {
            proccessedBusinessSocialLinks = user.tourBusinessEntity.socialLinks
                .replace(",", "")
                .replace("https://www.", "")
                .split("\n")
                .filter(Boolean)
                .map((str) => str.trim());
        }
        console.log(user);
    });
</script>

{#if user.tourBusinessEntity && user.tourOperatorEntity}
    <div class="content-container">
        <div class="content-row">
            <div class="full-row">
                <h3>Tour Operator</h3>
            </div>
        </div>
        {#if user.tourOperatorEntity.firstName && user.tourOperatorEntity.lastName}
            <div class="content-row">
                <div class="full-row">
                    Full name: {user.tourOperatorEntity.firstName}
                    {user.tourOperatorEntity.lastName}
                </div>
            </div>
        {/if}
        {#if user.tourOperatorEntity.email && user.tourOperatorEntity.phoneNumber}
            <div class="content-row">
                <div class="full-row">
                    Email: <a href="mailto:{user.tourOperatorEntity.email}"
                        >{user.tourOperatorEntity.email}</a
                    >
                    Phone number: {user.tourOperatorEntity.phoneNumber}
                </div>
            </div>
        {/if}
        {#if user.tourOperatorEntity.city}
            <div class="content-row">
                <div class="full-row">
                    Location: {user.tourOperatorEntity.city}
                </div>
            </div>
        {/if}
        {#if user.tourOperatorEntity.foreignLanguages}
            <div class="content-row">
                <div class="full-row">
                    Foreign languages: {user.tourOperatorEntity
                        .foreignLanguages}
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
        <hr />
        {#if user.tourBusinessEntity.businessName && user.tourBusinessEntity.cui}
            <div class="content-row">
                <div class="full-row">
                    Business name: {user.tourBusinessEntity.businessName}, CUI: {user
                        .tourBusinessEntity.cui}
                </div>
            </div>
        {/if}
        {#if user.tourBusinessEntity.email && user.tourBusinessEntity.website}
            <div class="content-row">
                <div class="full-row">
                    Email: <a href="mailto:{user.tourBusinessEntity.email}"
                        >{user.tourBusinessEntity.email}</a
                    >
                    Website:
                    <a href="//{user.tourBusinessEntity.website}"
                        >{user.tourBusinessEntity.website}</a
                    > &nbsp;
                </div>
            </div>
        {/if}
        {#if user.tourBusinessEntity.address}
            <div class="content-row">
                <div class="full-row">
                    Address: {user.tourBusinessEntity.address}
                </div>
            </div>
        {/if}
        {#if proccessedBusinessSocialLinks}
            <div class="content-row">
                <div class="full-row">
                    Social links: {#each proccessedBusinessSocialLinks as link}
                        <a href="//{link}">{link}</a> &nbsp;
                    {/each}
                </div>
            </div>
        {/if}
        <div class="content-row">
            <FooterButtons id={user.id} />
        </div>
    </div>
{/if}

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
    hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border-top: 1px solid black;
    }
</style>
