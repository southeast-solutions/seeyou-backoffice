<script>
    import { onMount } from "svelte";
    import PageLoader from "./PageLoader.svelte";
    import Input from "../../SharedComponents/Input.svelte";
    import { guardSignedUser } from "../../Services/AuthService";
    import { getUserData } from "../../Services/ProfileService";
    import NavBar from "./NavBar.svelte";
    import {
        tourOperator,
        promoter,
        contentCreator,
        concierge,
    } from "../../Enums/UserTypes";
    import ProfilePhotoCard from "../../SharedComponents/ProfilePhotoCard.svelte";

    let user = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        city: "",
        country: "",
        foreignLanguages: "",
        businessName: "",
        businessWebsite: "",
        cui: "",
        adress: "",
        socialLinks: "",
        currentJob: "",
        disponiblityDescription: "",
        profileUrl: "",
    };

    let userInfo;

    onMount(async () => {
        guardSignedUser();
        const userId = localStorage.getItem("seeyou_user_id");
        if (userId) {
            userInfo = await getUserData(userId);
            user.socialLinks = userInfo.tourOperatorEntity.socialLinks;
            user.firstName = userInfo.tourOperatorEntity.firstName;
            user.lastName = userInfo.tourOperatorEntity.lastName;
            user.foreignLanguages =
                userInfo.tourOperatorEntity.foreignLanguages;
            user.city = userInfo.tourOperatorEntity.city;
            user.cui = userInfo.tourBusinessEntity.cui;
            user.adress = userInfo.tourBusinessEntity.adress;
            user.businessName = userInfo.tourBusinessEntity.businessName;
        } else {
            return;
        }
    });
    const previewImage = () => {
        var file = document.getElementById("file").files;
        if (file.length > 0) {
            var fileReader = new FileReader();

            fileReader.onload = function (event) {
                user["profileUrl"] = event.target.result;
            };

            fileReader.readAsDataURL(file[0]);
        }
    };
</script>

<NavBar />

<div class="home-page-container">
    {#if userInfo}
        <div class="left-card">
            <ProfilePhotoCard
                city={user?.city ? user.city : ""}
                country={user?.country ? user.country : ""}
                phoneNumber={user?.phoneNumber}
                profileUrl={user.profileUrl}
                firstName={user.firstName ? user.firstName : ""}
                lastName={user?.lastName ? user?.lastName : ""}
                email={user?.email ? user?.email : ""}
                onChangeProfileUrl={() => previewImage()}
            />
        </div>

        <div class="right-card">
            <div class="center-row">
                <div class="form-row">
                    <div class="half-row">
                        <Input
                            label={"First name"}
                            value={user.firstName ? user.firstName : ""}
                            className="half-row"
                            name="pla"
                            onChange={(e) => {
                                userInfo["firstName"] = e.target.value;
                            }}
                        />
                    </div>
                    <div class="half-row">
                        <Input
                            hasErr={false}
                            label={"Last name"}
                            value={user.lastName ? user.lastName : ""}
                            className="half-row"
                            name="pla"
                            onChange={(e) =>
                                (userInfo["lastName"] = e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div class="center-row">
                <div class="form-row">
                    <div class="half-row">
                        <Input
                            label={"Phone number"}
                            value={user.phoneNumber ? user.phoneNumber : ""}
                            className="half-row"
                            name="pla"
                            onChange={(e) =>
                                (userInfo["phoneNumber"] = e.target.value)}
                        />
                    </div>
                    <div class="half-row">
                        <Input
                            label={"City"}
                            className="half-row"
                            name="pla"
                            onChange={(e) =>
                                (userInfo["city"] = e.target.value)}
                            value={user?.city ? user.city : ""}
                        />
                    </div>
                </div>
            </div>

            <div class="center-row">
                <div class="form-row">
                    <div class="half-row">
                        <Input
                            label={"Country"}
                            value={user.country ? user.country : ""}
                            className="half-row"
                            name="pla"
                            onChange={(e) =>
                                (userInfo["country"] = e.target.value)}
                        />
                    </div>
                    <div class="half-row">
                        <Input
                            label={"Foreign Languages"}
                            value={user.foreignLanguages
                                ? user.foreignLanguages
                                : ""}
                            className="half-row"
                            name="pla"
                            onChange={(e) =>
                                (userInfo["foreignLanguages"] = e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {#if user.userType == tourOperator}
                <div class="center-row">
                    <div class="form-row">
                        <div class="half-row">
                            <Input
                                label={"Business Name"}
                                className="half-row"
                                name="pla"
                                value={user.businessName
                                    ? user.businessName
                                    : ""}
                                onChange={(e) =>
                                    (userInfo["businessName"] = e.target.value)}
                            />
                        </div>
                        <div class="half-row">
                            <Input
                                label={"Business Website"}
                                className="half-row"
                                name="pla"
                                value={user.businessWebsite
                                    ? user.businessWebsite
                                    : ""}
                                onChange={(e) =>
                                    (userInfo["businessWebsite"] =
                                        e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            {/if}
            <div class="center-row">
                <div class="form-row">
                    <div class="half-row">
                        <Input
                            label={"Cui"}
                            className="half-row"
                            name="pla"
                            onChange={(e) => (userInfo["cui"] = e.target.value)}
                            value={user.cui ? user.cui : ""}
                        />
                    </div>
                    <div class="half-row">
                        <Input
                            label={"Adress"}
                            className="half-row"
                            name="pla"
                            onChange={(e) =>
                                (userInfo["adress"] = e.target.value)}
                            value={user.adress ? user.adress : ""}
                        />
                    </div>
                </div>
            </div>
            <div class="center-row">
                <div class="form-row">
                    <div class="half-row">
                        <Input
                            label={"Social Links"}
                            className="half-row"
                            name="pla"
                            onChange={(e) =>
                                (userInfo["socialLinks"] = e.target.value)}
                            value={user.socialLinks ? user.socialLinks : ""}
                        />
                    </div>
                </div>
            </div>

            {#if user.userType == promoter}
                <div class="center-row">
                    <div class="form-row">
                        <div class="half-row">
                            <Input
                                label={"Current Job"}
                                className="half-row"
                                name="pla"
                                onChange={(e) =>
                                    (userInfo["currentJob"] = e.target.value)}
                                value={user.currentJob ? user.currentJob : ""}
                            />
                        </div>
                        <div class="half-row">
                            <Input
                                label={"Social Links"}
                                className="half-row"
                                name="pla"
                                onChange={(e) =>
                                    (userInfo["socialLinks"] = e.target.value)}
                                value={user.socialLinks ? user.socialLinks : ""}
                            />
                        </div>
                    </div>
                </div>
            {/if}
            {#if user.disponibilityDescription}
                <div class="center-row">
                    <div class="form-row">
                        <Input
                            label={"Disponibility Description"}
                            className="half-row"
                            name="pla"
                            onChange={(e) =>
                                (userInfo["disponiblityDescription"] =
                                    e.target.value)}
                            value={user.disponiblityDescription
                                ? user.disponiblityDescription
                                : ""}
                        />
                    </div>
                </div>
            {/if}
            {#if user.userType == contentCreator}
                <div class="center-row">
                    <div class="form-row">
                        <div class="half-row">
                            <Input
                                label={"Social Links"}
                                className="half-row"
                                name="pla"
                                onChange={(e) =>
                                    (userInfo["socialLinks"] = e.target.value)}
                                value={user.socialLinks ? user.socialLinks : ""}
                            />
                        </div>
                        <div class="half-row">
                            <Input
                                label={"Disponibility Description"}
                                className="half-row"
                                name="pla"
                                onChange={(e) =>
                                    (userInfo["disponibilityDescription"] =
                                        e.target.value)}
                                value={user.disponibilityDescription
                                    ? user.disponiblityDescription
                                    : ""}
                            />
                        </div>
                    </div>
                </div>
            {/if}
            {#if user.userType == concierge}
                <div class="center-row">
                    <div class="form-row">
                        <Input
                            label={"Social Links"}
                            className="half-row"
                            name="pla"
                            onChange={(e) =>
                                (userInfo["socialLinks"] = e.target.value)}
                            value={user.socialLinks ? user.socialLinks : ""}
                        />
                    </div>
                </div>
            {/if}
            <button class="main-button cta-button" on:click={console.log(user)}
                >{"Update"}</button
            >
        </div>
    {:else}
        <PageLoader />
    {/if}
</div>

<style>
    .home-page-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        background-color: #f7f9fb;
        padding-left: 10%;
        padding-right: 10%;
        flex-wrap: wrap;
        padding-top: 100px;
    }

    .left-card {
        width: 30%;
        min-width: 200px;
        box-shadow: 6px 5px 12px 0px rgba(159, 159, 159, 0.86);
        -webkit-box-shadow: 6px 5px 12px 0px rgba(159, 159, 159, 0.86);
        -moz-box-shadow: 6px 5px 12px 0px rgba(159, 159, 159, 0.86);
        border-radius: 20px;
    }

    .right-card {
        padding: 60px;
        width: 68%;
        background-color: white;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        min-width: 400px;
        box-shadow: 6px 5px 12px 0px rgba(159, 159, 159, 0.86);
        -webkit-box-shadow: 6px 5px 12px 0px rgba(159, 159, 159, 0.86);
        -moz-box-shadow: 6px 5px 12px 0px rgba(159, 159, 159, 0.86);
        align-items: flex-end;
    }

    .cta-button {
        width: 100px;
        height: 30px;
        border-radius: 5px;
    }

    .center-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .form-row {
        margin-bottom: 5px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .half-row {
        width: 45%;
    }
</style>
