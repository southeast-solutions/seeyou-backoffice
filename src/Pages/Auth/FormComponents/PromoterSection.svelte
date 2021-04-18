<script>
    import { createEventDispatcher, afterUpdate } from "svelte";
    import Input from "../../../SharedComponents/Input.svelte";
    import Textarea from "../../../SharedComponents/Textarea.svelte";

    $: ({ id, ...promoterSectionProps } = $$props);

    $: validation = {};

    afterUpdate(() => {
        validation = $$props.registerValidationData.promoterDataValidation;
    });

    const dispatch = createEventDispatcher();

    $: firstName = "";
    $: lastName = "";
    $: phoneNumber = "";
    $: email = "";
    $: password = "";
    $: passwordRepeat = "";
    $: socialLinks = "";
    $: city = "";
    $: country = "";
    $: isStudent = false;
    $: currentJob = "";
    $: foreignLanguages = "";
    $: disponibilityDescription = "";

    $: {
        const dataToPropagate = {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            passwordRepeat,
            socialLinks,
            city,
            country,
            isStudent,
            currentJob,
            foreignLanguages,
            disponibilityDescription,
        };

        dispatch("completeData", dataToPropagate);
    }
</script>

<div class="promoter-section">
    <div class="section-title">About you</div>
    <div class="register-form-row">
        <div class="input-resizer">
            <Input
                label="First Name"
                type="text"
                placeholder="First name.."
                onChange={(e) => {
                    firstName = e.target.value;
                    dispatch("completeData");
                }}
                value=""
                mandatory
                hasError={!!validation.firstName}
                errMessage={validation.firstName || ""}
            />
        </div>

        <div class="input-resizer">
            <Input
                label="Last name"
                type="text"
                placeholder="Last name.."
                onChange={(e) => {
                    lastName = e.target.value;
                    dispatch("completeData");
                }}
                value=""
                mandatory
                hasError={!!validation.lastName}
                errMessage={validation.lastName || ""}
            />
        </div>
    </div>
    <div class="register-form-row">
        <div class="phone-number-resizer">
            <Input
                label="Phone number"
                type="number"
                placeholder="Phone number.."
                onChange={(e) => {
                    phoneNumber = e.target.value;
                    dispatch("completeData");
                }}
                value=""
                mandatory
                hasError={!!validation.phoneNumber}
                errMessage={validation.phoneNumber || ""}
            />
        </div>

        <div class="input-resizer">
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
    </div>
    <div class="register-form-row">
        <div class="input-resizer">
            <Input
                label="Password"
                type="password"
                placeholder="Password.."
                onChange={(e) => {
                    password = e.target.value;
                    dispatch("completeData");
                }}
                value=""
                mandatory
                hasError={!!validation.password}
                errMessage={validation.password || ""}
            />
        </div>

        <div class="input-resizer">
            <Input
                label="Repeat password"
                type="password"
                placeholder="Repeat password.."
                onChange={(e) => {
                    passwordRepeat = e.target.value;
                    dispatch("completeData");
                }}
                value=""
                mandatory
                hasError={!!validation.passwordRepeat}
                errMessage={validation.passwordRepeat || ""}
            />
        </div>
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
            rows={5}
        />
    </div>
    <div class="register-form-row">
        <div class="input-resizer">
            <Input
                label="City"
                type="text"
                placeholder="City.."
                onChange={(e) => {
                    city = e.target.value;
                    dispatch("completeData");
                }}
                value=""
                mandatory
                hasError={!!validation.city}
                errMessage={validation.city || ""}
            />
        </div>

        <div class="input-resizer">
            <Input
                label="Country"
                type="text"
                placeholder="Country.."
                onChange={(e) => {
                    (country = e.target.value), dispatch("completeData");
                }}
                value=""
                mandatory
                hasError={!!validation.country}
                errMessage={validation.country || ""}
            />
        </div>
    </div>

    <div class="student-checkbox">
        I'm a student
        <input
            onChange={(e) => {
                isStudent = e.target.value;
                dispatch("completeData");
            }}
            class="checbox-input"
            type="checkbox"
            bind:checked={isStudent}
        />
    </div>

    <div class="register-form-row">
        <Input
            label="Current job"
            type="text"
            placeholder="Current job.."
            onChange={(e) => {
                currentJob = e.target.value;
                dispatch("completeData");
            }}
            value=""
            mandatory
            disabled={isStudent}
            hasError={!!validation.currentJob}
            errMessage={validation.currentJob || ""}
        />
    </div>
    <div class="register-form-row">
        <Input
            label="Foreign languages spoken"
            type="text"
            placeholder="Foreign languages spoken.."
            onChange={(e) => {
                foreignLanguages = e.target.value;
                dispatch("completeData");
            }}
            value=""
            mandatory
            hasError={!!validation.foreignLanguages}
            errMessage={validation.foreignLanguages || ""}
        />
    </div>
    <div class="register-form-row">
        <Textarea
            value=""
            label="Disponibility for promoting activities"
            placeholder="Disponibility for promoting activities.."
            onChange={(e) => {
                disponibilityDescription = e.target.value;
                dispatch("completeData");
            }}
            rows={5}
        />
    </div>
</div>

<style>
    .promoter-section {
        width: 100%;
    }

    .input-resizer {
        width: 49%;
    }

    .phone-number-resizer {
        width: 49%;
    }

    .register-form-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 24px;
    }

    .student-checkbox {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        color: #54709c;
        margin-top: 10px;
        margin-bottom: 30px;
    }

    .checbox-input {
        margin: 0;
        margin-left: 10px;
        margin-top: 3px;
        width: 16px;
        height: 16px;
        border-width: 2px;
        padding: 0;
    }
</style>
