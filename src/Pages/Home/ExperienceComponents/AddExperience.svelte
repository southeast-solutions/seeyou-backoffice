<script>
    import Input from "../../../SharedComponents/Input.svelte";
    import {
        tour,
        trip,
        vacation,
        local,
    } from "../../../Enums/ExperienceTypes";

    let experienceName = "";
    let experienceType = local;

    const selectType = (type) => {
        console.log("a");
        experienceType = type;
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
                name="pla"
                onChange={() => console.log("typing....")}
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
                className="half-row"
                name="pla"
                onChange={() => console.log("typing....")}
            />
        </div>
        <div class="half-row">
            <Input
                label="Price (RON)"
                className="half-row"
                name="pla"
                onChange={() => console.log("typing....")}
            />
        </div>
    </div>
    <div class="form-row">
        <div class="half-row">
            <Input
                label="Available languages"
                className="half-row"
                name="pla"
                onChange={() => console.log("typing....")}
            />
        </div>
        <div class="half-row">
            <Input
                label="Number of participants"
                className="half-row"
                name="pla"
                onChange={() => console.log("typing....")}
            />
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
</style>
