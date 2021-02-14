<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    $: firstName = "";
    $: lastName = "";
    $: phoneNumber = "";
    $: email = "";
    $: password = "";
    $: passwordRepeat = "";
    $: socialLinks = "";
    $: city = "";
    $: foreignLanguages = "";

    $: vFirstName = false;
    $: vLastName = false;
    $: vPhoneNumber = false;
    $: vEmail = false;
    $: vPassword = false;
    $: vPasswordRepeat = false;
    $: vSocialLinks = false;
    $: vCity = false;
    $: vForeignLanguages = false;

    $: {
        vFirstName = firstName ? true : false;
        vLastName = lastName ? true : false;
        if (email) {
            if (email.includes("@")) {
                vEmail = true;
            } else {
                vEmail = false;
            }
        } else {
            vEmail = false;
        }
        vPhoneNumber = /^\d+$/.test(phoneNumber);
        vPassword = password ? true : false;

        vPasswordRepeat = password === passwordRepeat;

        vSocialLinks = socialLinks ? true : false;
        vCity = city ? true : false;
        vForeignLanguages = foreignLanguages ? true : false;

        if (
            vFirstName &&
            vLastName &&
            vPhoneNumber &&
            vEmail &&
            vPassword &&
            vPasswordRepeat &&
            vSocialLinks &&
            vCity &&
            vForeignLanguages
        ) {
            dispatch("validSection", {
                firstName,
                lastName,
                email,
                password,
                socialLinks,
                city,
                foreignLanguages,
            });
        } else {
            dispatch("notValid");
        }
    }
</script>

<div class="form-section">
    <div class="section-title">About you</div>
    <div class="form-row">
        <input
            type="text"
            class="half-row {vFirstName ? 'valid-form' : 'invalid-form'}"
            placeholder="First name"
            bind:value={firstName}
        />
        <input
            type="text"
            class="half-row {vLastName ? 'valid-form' : 'invalid-form'}"
            placeholder="Last name"
            bind:value={lastName}
        />
    </div>
    <div class="form-row">
        <input
            type="text"
            class="quarter-row {vPhoneNumber ? 'valid-form' : 'invalid-form'}"
            placeholder="Phone number"
            bind:value={phoneNumber}
        />
        <input
            type="text"
            class="three-quarter-row {vEmail ? 'valid-form' : 'invalid-form'}"
            placeholder="Email"
            bind:value={email}
        />
    </div>
    <div class="form-row">
        <input
            type="password"
            class="half-row {vPassword ? 'valid-form' : 'invalid-form'}"
            placeholder="Password"
            bind:value={password}
        />
        <input
            type="password"
            class="half-row {vPasswordRepeat ? 'valid-form' : 'invalid-form'}"
            placeholder="Repeat password"
            bind:value={passwordRepeat}
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
            class="full-row {vCity ? 'valid-form' : 'invalid-form'}"
            placeholder="City"
            bind:value={city}
        />
    </div>

    <div class="form-row">
        <input
            type="text"
            class="full-row {vForeignLanguages ? 'valid-form' : 'invalid-form'}"
            placeholder="Foreign languages spoken"
            bind:value={foreignLanguages}
        />
    </div>
</div>

<style></style>
