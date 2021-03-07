<script>
    import { createEventDispatcher } from "svelte";
    import { validateEmail } from "../../../Validators/UserValidators";

    const dispatch = createEventDispatcher();

    $: cui = "";
    $: businessName = "";
    $: email = "";
    $: socialLinks = "";
    $: website = "";
    $: address = "";

    $: vCui = false;
    $: vBusinessName = false;
    $: vEmail = false;
    $: vSocialLinks = false;
    $: vWebsite = false;
    $: vAddress = false;

    $: {
        vCui = cui ? true : false;
        vBusinessName = businessName ? true : false;
        vEmail = validateEmail(email);

        vSocialLinks = socialLinks ? true : false;
        vWebsite = website ? true : false;
        vAddress = address ? true : false;

        if (
            vCui &&
            vBusinessName &&
            vEmail &&
            vSocialLinks &&
            vWebsite &&
            vAddress
        ) {
            dispatch("validSection", {
                cui,
                businessName,
                email,
                socialLinks,
                website,
                address,
            });
        } else {
            dispatch("notValid");
        }
    }
</script>

<div class="form-section">
    <div class="section-title">About your business</div>
    <div class="form-row">
        <input
            type="text"
            class="quarter-row {vCui ? 'valid-form' : 'invalid-form'}"
            placeholder="Business unique code (CUI)"
            bind:value={cui}
        />
        <input
            type="text"
            class="three-quarter-row {vBusinessName
                ? 'valid-form'
                : 'invalid-form'}"
            placeholder="Business name"
            bind:value={businessName}
        />
    </div>
    <div class="form-row">
        <input
            type="text"
            class="full-row {vEmail ? 'valid-form' : 'invalid-form'}"
            placeholder="Email"
            bind:value={email}
        />
    </div>
    <div class="form-row">
        <textarea
            name="textarea"
            cols="30"
            rows="3"
            class="{vSocialLinks ? 'valid-form' : 'invalid-form'} full-row"
            placeholder="Social media links"
            bind:value={socialLinks}
        />
    </div>
    <div class="form-row">
        <input
            type="text"
            class="full-row {vWebsite ? 'valid-form' : 'invalid-form'}"
            placeholder="Website"
            bind:value={website}
        />
    </div>

    <div class="form-row">
        <input
            type="text"
            class="full-row {vAddress ? 'valid-form' : 'invalid-form'}"
            placeholder="Address"
            bind:value={address}
        />
    </div>
</div>

<style></style>
