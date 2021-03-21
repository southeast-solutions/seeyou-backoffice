<script>
    import { createEventDispatcher } from "svelte";
import Input from "../../../SharedComponents/Input.svelte";
import Textarea from "../../../SharedComponents/Textarea.svelte";
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

<div class="tour-business-section">
    <div class="section-title">About your business</div>
    <div class="register-form-row">
        <div class="input-resizer">
            <Input
            label="Business name"
            type="text"
            placeholder="Business name.."
            onChange={(e) => businessName = e.target.value}
            value=""
            mandatory
            />
        </div>
       
        <div class="input-resizer">
            <Input
            label="Business unique code (CUI)"
            type="text"
            placeholder="Business unique code (CUI).."
            onChange={(e) => cui = e.target.value}
            value=""
            mandatory
            />
        </div>
    </div>
    
    <div class="register-form-row">
        <Input
        label="Email"
        type="text"
        placeholder="Email.."
        onChange={(e) => email = e.target.value}
        value=""
        mandatory
        />
    </div>
    <div class="register-form-row">
        <Textarea 
            value=""
            label="Social Links"
            placeholder="Social Links.."
            onChange={(e) => socialLinks = e.target.value}
            rows={3}
        />
    </div>
    <div class="register-form-row">
        <Input
        label="Website"
        type="text"
        placeholder="Website.."
        onChange={(e) => website = e.target.value}
        value=""
        mandatory
        />
    </div>

    <div class="register-form-row">
        <Input
        label="Address"
        type="text"
        placeholder="Address.."
        onChange={(e) => address = e.target.value}
        value=""
        mandatory
        />
    </div>
</div>

<style>

.tour-business-section {
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
</style>
