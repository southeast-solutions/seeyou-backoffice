<script>
    export let user;

    import { onMount } from "svelte";
    import FooterButtons from "./FooterButtons.svelte";
    let proccessedSocialLinks = undefined;
    let proccessedBusinessSocialLinks = undefined;

    onMount(() => {
        if (user.operator.socialLinks) {
            proccessedSocialLinks = user.operator.socialLinks
                .replace(",", "")
                .replace("https://www.", "")
                .split("\n")
                .filter(Boolean)
                .map((str) => str.trim());
        }
        if (user.business.socialLinks) {
            proccessedBusinessSocialLinks = user.business.socialLinks
                .replace(",", "")
                .replace("https://www.", "")
                .split("\n")
                .filter(Boolean)
                .map((str) => str.trim());
        }
    });
</script>

{#if user.operator && user.business}
    <div class="content-container">
        <div class="content-row">
            <div class="full-row">
                <h3>Tour Operator</h3>
            </div>
        </div>
        {#if user.operator.firstName && user.operator.lastName}
            <div class="content-row">
                <div class="full-row">
                    Full name: {user.operator.firstName}
                    {user.operator.lastName}
                </div>
            </div>
        {/if}
        {#if user.operator.email && user.operator.phoneNumber}
            <div class="content-row">
                <div class="full-row">
                    Email: <a href="mailto:{user.operator.email}"
                        >{user.operator.email}</a
                    >
                    Phone number: {user.operator.phoneNumber}
                </div>
            </div>
        {/if}
        {#if user.operator.city}
            <div class="content-row">
                <div class="full-row">
                    Location: {user.operator.city}
                </div>
            </div>
        {/if}
        {#if user.operator.foreignLanguages}
            <div class="content-row">
                <div class="full-row">
                    Foreign languages: {user.operator.foreignLanguages}
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
        {#if user.business.businessName && user.business.cui}
            <div class="content-row">
                <div class="full-row">
                    Business name: {user.business.businessName}, CUI: {user
                        .business.cui}
                </div>
            </div>
        {/if}
        {#if user.business.email && user.business.website}
            <div class="content-row">
                <div class="full-row">
                    Email: <a href="mailto:{user.business.email}"
                        >{user.business.email}</a
                    >
                    Website:
                    <a href="//{user.business.website}"
                        >{user.business.website}</a
                    > &nbsp;
                </div>
            </div>
        {/if}
        {#if user.business.address}
            <div class="content-row">
                <div class="full-row">
                    Address: {user.business.address}
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
