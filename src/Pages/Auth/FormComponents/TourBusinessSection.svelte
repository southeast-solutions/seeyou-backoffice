<script>
    import { createEventDispatcher, afterUpdate } from "svelte";
    import Input from "../../../SharedComponents/Input.svelte";
    import Textarea from "../../../SharedComponents/Textarea.svelte";

    const dispatch = createEventDispatcher();

    $: validation = {};

    afterUpdate(() => {
        validation = $$props.registerValidation.tourBusinessDataValidation;
    });

    $: cui = "";
    $: businessName = "";
    $: email = "";
    $: socialLinks = "";
    $: website = "";
    $: address = "";

    $: {
        const dataToPropagate = {
            cui,
            businessName,
            email,
            socialLinks,
            website,
            address,
        };

        dispatch("completeData", dataToPropagate);
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
                onChange={(e) => {
                    businessName = e.target.value;
                    dispatch("completeData");
                }}
                value=""
                mandatory
                hasError={!!validation.businessName}
                errMessage={validation.businessName || ""}
            />
        </div>

        <div class="input-resizer">
            <Input
                label="Business unique code"
                type="text"
                placeholder="CUI.."
                onChange={(e) => {
                    cui = e.target.value;
                    dispatch("completeData");
                }}
                value=""
                mandatory
                hasError={!!validation.cui}
                errMessage={validation.cui || ""}
            />
        </div>
    </div>

    <div class="register-form-row">
        <Input
            label="Email"
            type="text"
            placeholder="Email.."
            onChange={(e) => {
                email = e.target.value;
                dispatch("completeData");
            }}
            value=""
            mandatory
            hasError={!!validation.email}
            errMessage={validation.email || ""}
        />
    </div>
    <div class="register-form-row">
        <Textarea
            value=""
            label="Social Links"
            placeholder="Social Links.."
            onChange={(e) => {
                socialLinks = e.target.value;
                dispatch("completeData");
            }}
            rows={3}
        />
    </div>
    <div class="register-form-row">
        <Input
            label="Website"
            type="text"
            placeholder="Website.."
            onChange={(e) => {
                website = e.target.value;
                dispatch("completeData");
            }}
            value=""
            mandatory
            hasError={!!validation.website}
            errMessage={validation.website || ""}
        />
    </div>

    <div class="register-form-row">
        <Input
            label="Address"
            type="text"
            placeholder="Address.."
            onChange={(e) => {
                address = e.target.value;
                dispatch("completeData");
            }}
            value=""
            mandatory
            hasError={!!validation.address}
            errMessage={validation.address || ""}
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
        margin-top: 24px;
    }
</style>
