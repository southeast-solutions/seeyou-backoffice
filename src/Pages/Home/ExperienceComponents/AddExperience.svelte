<script>
    import { onMount, createEventDispatcher } from "svelte";
    import Map from "./Map.svelte";
    import Input from "../../../SharedComponents/Input.svelte";
    import Textarea from "../../../SharedComponents/Textarea.svelte";
    import InputList from "../../../SharedComponents/InputList.svelte";
    import {
        tour,
        trip,
        vacation,
        local,
    } from "../../../Enums/ExperienceTypes";
    import {
        addExperience,
        uploadPhoto,
    } from "../../../Services/ExperiencesService";
    import SimplePicker from "simplepicker";
    import MultiplePhotoPicker from "../../../SharedComponents/MultiplePhotoPicker.svelte";

    const dispatch = createEventDispatcher();

    const nullMessage = "Field is mandatory";
    const invalidValue = "Invalid value";
    const mapError = "No location was placed";

    let globalError;

    let experienceName = "";
    let experienceType = local;
    let duration = 2;
    let price = 50;
    let numberOfParticipants = 10;
    let availableLanguages = "";
    let description = "";
    let locations = {};
    let includedServices = [];
    let notIncludedServices = [];
    let images = [];

    let datetimeComponent;
    let datePicker;
    let readableDate;
    let selectedDate;

    let errors = {};

    let isAddLoading = false;

    const selectType = (type) => {
        experienceType = type;
    };
    onMount(() => {
        datePicker = new SimplePicker(datetimeComponent, { zIndex: 10 });
        datePicker.on("submit", (date, readable) => {
            selectedDate = date;
            readableDate = readable;
        });
    });

    const mapUpdated = (event) => {
        locations = {
            latitude: event.detail.lat(),
            longitude: event.detail.lng(),
        };
    };
    const includedServicesChanged = (event) => {
        includedServices = event.detail;
    };
    const notIncludedServicesChanged = (event) => {
        notIncludedServices = event.detail;
    };
    const imagesChanged = (event) => {
        images = event.detail;
    };
    const uploadImages = async () => {
        try {
            const promises = images.map((image) => uploadPhoto(image));
            const responses = await Promise.all(promises);
            console.log(responses);
            let valid = true;
            responses.forEach((element) => {
                if (element === undefined) {
                    valid = false;
                }
            });
            return valid ? responses : undefined;
        } catch (e) {
            return undefined;
        }
    };

    const saveClicked = async () => {
        validateInputs();
        if (!isValid()) return;

        isAddLoading = true;
        globalError = "";
        let urls = await uploadImages();
        if (urls === undefined) {
            globalError = "Error uploading photos";
            return;
        }
        addExperience({
            dateTime: selectedDate,
            name: experienceName,
            type: experienceType,
            duration,
            price,
            numberOfTourists: numberOfParticipants,
            availableLanguages,
            location: locations,
            description,
            includedServices,
            notIncludedServices,
            highlights: urls,
        })
            .then(() => {
                dispatch("added");
            })
            .catch((err) => {
                globalError = err.message;
            })
            .finally(() => {
                isAddLoading = false;
            });
    };

    const validateInputs = () => {
        if (!experienceName) errors["name"] = nullMessage;
        else errors["name"] = undefined;

        if (price <= 0) errors["price"] = invalidValue;
        else errors["price"] = undefined;

        if (duration <= 0) errors["duration"] = invalidValue;
        else errors["duration"] = undefined;

        if (numberOfParticipants <= 0)
            errors["numberOfParticipants"] = invalidValue;
        else errors["numberOfParticipants"] = undefined;

        if (!availableLanguages) errors["availableLanguages"] = nullMessage;
        else errors["availableLanguages"] = undefined;

        if (locations) {
            if (!locations.latitude || !locations.longitude) {
                errors["locations"] = mapError;
            } else {
                errors["locations"] = undefined;
            }
        } else {
            errors["locations"] = mapError;
        }

        if (!selectedDate) errors["date"] = invalidValue;
        else errors["date"] = undefined;
    };
    const isValid = () => {
        for (const key in errors) {
            if (errors[key]) return false;
        }
        return true;
    };
</script>

<div class="forms__container">
    <div class="form-row">
        <div class="full-row">
            <h1>Add experience</h1>
        </div>
    </div>
    <div class="form-row">
        <div class="full-row">
            <Input
                label="Experience name"
                className="half-row"
                value={experienceName}
                hasErr={errors["name"]}
                errMessage={errors["name"]}
                name="pla"
                onChange={(event) => (experienceName = event.target.value)}
            />
        </div>
    </div>
    <div class="form-row">
        <div class="full-row">
            Experience type:
            <div class="form__row__choice">
                <div
                    class="form__type__choice {experienceType === local
                        ? 'form__type__choice__selected'
                        : ''}"
                    on:click={() => selectType(local)}
                >
                    Local
                </div>
                <div
                    class="form__type__choice {experienceType === tour
                        ? 'form__type__choice__selected'
                        : ''}"
                    on:click={() => selectType(tour)}
                >
                    Tour
                </div>
                <div
                    class="form__type__choice {experienceType === trip
                        ? 'form__type__choice__selected'
                        : ''}"
                    on:click={() => selectType(trip)}
                >
                    Trip
                </div>
                <div
                    class="form__type__choice {experienceType === vacation
                        ? 'form__type__choice__selected'
                        : ''}"
                    on:click={() => selectType(vacation)}
                >
                    Vacation
                </div>
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="half-row">
            <Input
                label="Duration ({experienceType === vacation
                    ? 'days'
                    : 'hours'})"
                value={duration}
                className="half-row"
                name="pla"
                type="number"
                hasErr={errors["duration"]}
                errMessage={errors["duration"]}
                onChange={(event) => (duration = event.target.value)}
            />
        </div>
        <div class="half-row">
            <Input
                label="Price (RON)"
                value={price}
                className="half-row"
                name="pla"
                type="number"
                hasErr={errors["price"]}
                errMessage={errors["price"]}
                onChange={(event) => (price = event.target.value)}
            />
        </div>
    </div>
    <div class="form-row">
        <div class="half-row">
            <Input
                label="Available languages"
                className="half-row"
                name="pla"
                hasErr={errors["availableLanguages"]}
                errMessage={errors["availableLanguages"]}
                value={availableLanguages}
                onChange={(event) => (availableLanguages = event.target.value)}
            />
        </div>
        <div class="half-row">
            <Input
                label="Number of participants"
                className="half-row"
                name="pla"
                type="number"
                hasErr={errors["numberOfParticipants"]}
                errMessage={errors["numberOfParticipants"]}
                value={numberOfParticipants}
                onChange={(event) =>
                    (numberOfParticipants = event.target.value)}
            />
        </div>
    </div>
    <div class="form-row">
        <div class="full-row">
            <p class="form__row__title">
                Location {#if errors["locations"]}
                    <span style="color:red"> ({errors["locations"]})</span>
                {/if}
            </p>
        </div>
    </div>
    <div class="form-row">
        <div class="full-row">
            <Map isChangable={true} on:markerChanged={mapUpdated} />
        </div>
    </div>
    <div class="form-row">
        <div class="full-row">
            <p class="form__row__title">
                Date and time {#if errors["date"]}
                    <span style="color:red"> ({errors["date"]})</span>
                {/if}
            </p>
        </div>
    </div>
    <div class="form-row form__row__nomargin">
        <div class="full-row">
            <div bind:this={datetimeComponent} />
            <button
                class="main-button form__row__button"
                on:click={datePicker.open()}
                >{readableDate ? readableDate : "Select date and time"}</button
            >
        </div>
    </div>
    <div class="form-row">
        <div class="full-row">
            <Textarea
                value={description}
                label="Description"
                rows="5"
                placeholder="Add your description"
                onChange={(event) => (description = event.target.value)}
            />
        </div>
    </div>
    <div class="form-row">
        <div class="half-row">
            <p class="form__row__title">Included services</p>
        </div>
        <div class="half-row">
            <p class="form__row__title">Not included services</p>
        </div>
    </div>
    <div class="form-row">
        <div class="half-row">
            <InputList on:valueChanged={includedServicesChanged} />
        </div>
        <div class="half-row">
            <InputList on:valueChanged={notIncludedServicesChanged} />
        </div>
    </div>
    <div class="form-row">
        <div class="full-row">
            <p class="form__row__title">Photos (10 max)</p>
        </div>
    </div>
    <div class="form-row">
        <div class="full-row">
            <MultiplePhotoPicker on:imagesChanged={imagesChanged} />
        </div>
    </div>
    {#if globalError}
        <div class="form-row">
            <div class="full-row submit-row">
                <p class="form__row__title">
                    <span style="color:red">{globalError}</span>
                </p>
            </div>
        </div>
    {/if}

    <div class="form-row">
        <div class="full-row submit-row">
            <button class="main-button" on:click={saveClicked}
                >{isAddLoading ? "Please wait" : "Add experience"}</button
            >
        </div>
    </div>
</div>

<style>
    .forms__container {
        padding: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .full-row > h1 {
        margin-bottom: 10px;
    }
    .form__row__choice {
        display: flex;
        flex-direction: row;
    }
    .form__type__choice {
        height: 40px;
        width: 80px;
        border: 1px solid #549c79;
        color: #549c79;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        cursor: pointer;
    }
    .form__type__choice:first-child {
        border-radius: 5px 0px 0px 5px;
    }
    .form__type__choice:last-child {
        border-radius: 0px 5px 5px 0px;
    }
    .form__type__choice__selected {
        background-color: #549c79;
        color: white;
    }
    .form-row {
        margin-top: 20px;
    }
    .form__row__title {
        color: #132d5e;
        font-weight: bold;
    }
    .form__row__button {
        padding: 10px 20px;
        font-size: 16px;
        font-weight: 200;
    }
    .form__row__nomargin {
        margin: 0;
    }

    .submit-row {
        justify-content: center;
        display: flex;
    }
    .submit-row > .main-button {
        padding: 10px 30px;
        font-size: 24px;
        font-weight: 200;
    }
</style>
