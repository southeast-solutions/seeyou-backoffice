<script>
    import { createEventDispatcher } from "svelte";
import Input from "../../../SharedComponents/Input.svelte";
import Textarea from "../../../SharedComponents/Textarea.svelte";
    import {
        validateEmail,
    validatePhoneNumber,
    } from "../../../Validators/UserValidators";

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
    $: disponibilityDescription = "";

    $: vFirstName = false;
    $: vLastName = false;
    $: vPhoneNumber = false;
    $: vEmail = false;
    $: vPassword = false;
    $: vPasswordRepeat = false;
    $: vSocialLinks = false;
    $: vCity = false;
    $: vForeignLanguages = false;
    $: vDisponibility = false;

    $: {
        vFirstName = firstName ? true : false;
        vLastName = lastName ? true : false;
        vEmail = validateEmail(email);
        vPhoneNumber = validatePhoneNumber(phoneNumber);
        vPassword = password ? true : false;

        vPasswordRepeat = password === passwordRepeat;

        vSocialLinks = socialLinks ? true : false;
        vCity = city ? true : false;
        vForeignLanguages = foreignLanguages ? true : false;
        vDisponibility = disponibilityDescription ? true : false;

        if (
            vFirstName &&
            vLastName &&
            vPhoneNumber &&
            vEmail &&
            vPassword &&
            vPasswordRepeat &&
            vSocialLinks &&
            vCity &&
            vForeignLanguages &&
            vDisponibility
        ) {
            dispatch("validSection", {
                firstName,
                lastName,
                email,
                password,
                socialLinks,
                city,
                foreignLanguages,
                disponibilityDescription,
            });
        } else {
            dispatch("notValid");
        }
    }
</script>

<div class="content-creator-section">
    <div class="section-title">About you</div>
    <div class="register-form-row">
        <div class="input-resizer">
            <Input
            label="First Name"
            type="text"
            placeholder="First name.."
            onChange={(e) => firstName = e.target.value}
            value=""
            mandatory
            />
        </div>
       
        <div class="input-resizer">
            <Input
            label="Last name"
            type="text"
            placeholder="Last name.."
            onChange={(e) => lastName = e.target.value}
            value=""
            mandatory
            />
        </div>
        
    </div>
    <div class="register-form-row">

        <div class="phone-number-resizer">
            <Input
            label="Phone number"
            type="number"
            placeholder="Phone number.."
            onChange={(e) => phoneNumber = e.target.value}
            value=""
            mandatory
            />
        </div>
       
        <div class="input-resizer">
            <Input
            label="Email"
            type="text"
            placeholder="Email.."
            onChange={(e) => email = e.target.value}
            value=""
            mandatory
            />
        </div>
    </div>
    <div class="register-form-row">
        <div class="input-resizer">
            <Input
            label="Password"
            type="password"
            placeholder="Password.."
            onChange={(e) => password = e.target.value}
            value=""
            mandatory
            />
        </div>
       
        <div class="input-resizer">
            <Input
            label="Repeat password"
            type="password"
            placeholder="Repeat password.."
            onChange={(e) => passwordRepeat = e.target.value}
            value=""
            mandatory
            />
        </div>

    </div>
    <div class="register-form-row">
        <Textarea 
            value=""
            label="Social Links"
            placeholder="Social Links.."
            onChange={(e) => socialLinks = e.target.value}
            rows={5}
        />
    </div>
    <div class="register-form-row">
        <Input
        label="City"
        type="text"
        placeholder="City.."
        onChange={(e) => city = e.target.value}
        value=""
        mandatory
        />
    </div>

    <div class="register-form-row">
        <Input
        label="Foreign languages spoken"
        type="text"
        placeholder="Foreign languages spoken.."
        onChange={(e) => foreignLanguages = e.target.value}
        value=""
        mandatory
        />

    </div>
    <div class="register-form-row">
        <Textarea 
        value=""
        label="Disponibility for promoting activities"
        placeholder="Disponibility for promoting activities.."
        onChange={(e) => disponibilityDescription = e.target.value}
        rows={5}
    />
    </div>
</div>

<style>
.content-creator-section {
    width: 100%;
}

.input-resizer {
    width: 49%;
}

.register-form-row {
	width: 100%;
	display: flex;
	flex-direction: row;
    justify-content: space-between;
    margin-top: 16px;
}

.phone-number-resizer {
    width: 30%;
 }



</style>
