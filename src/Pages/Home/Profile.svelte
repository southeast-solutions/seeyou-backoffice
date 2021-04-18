<script>
    import { onMount } from "svelte";
    import PageLoader from "./PageLoader.svelte";
    import Input from "../../SharedComponents/Input.svelte";
    import { guardSignedUser } from "../../Services/AuthService";
    import { getUserData } from "../../Services/ProfileService";
    import NavBar from "./NavBar.svelte";
    import ProfilePhotoCard from "../../SharedComponents/ProfilePhotoCard.svelte";
    import "../../Enums/UserTypes";
    import {
        mapDataAfterUserType,
        tourOperatorMapper,
    } from "./Profile/Profile.Mappers";
    import { BASE_ROUTE } from "../../Services/Constants";
    import {
        promoter,
        concierge,
        tourOperator,
        contentCreator,
    } from "../../Enums/UserTypes";
    import {
        NotificationDisplay,
        notifier,
    } from "@beyonk/svelte-notifications";
    import Textarea from "../../SharedComponents/Textarea.svelte";

    let user = {};

    let currentFile = "";

    let userInfo;

    const updateProfilePhoto = async (imgSrc) => {
        const formData = new FormData();
        const LS_AUTH_TOKEN_KEY = "seeyou_auth_token";
        const token = localStorage.getItem(LS_AUTH_TOKEN_KEY);
        formData.append("dataFile", currentFile);
        notifier.info("Please wait", 4500);
        try {
            const upload = await fetch(`${BASE_ROUTE}/images/profile`, {
                method: "POST",
                body: formData,
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = await upload.json();

            if (result.success) {
                const userData = { ...user, profilePictureUrl: result.url };
                updateUserData(userData);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // === TO DO === CREATE MAPPERS FOR EACH USER TYPE
    // TEMPORARY FOR TYPE 1 HERE
    onMount(async () => {
        guardSignedUser();

        userInfo = await getUserData();
        console.log(userInfo);
        const mappedData = mapDataAfterUserType(userInfo);
        console.log(mappedData);
        user = mappedData;
    });
    const previewImage = () => {
        var file = document.getElementById("file").files;
        currentFile = file[0];
        if (file.length > 0) {
            var fileReader = new FileReader();

            fileReader.onload = function (event) {
                user["profilePictureUrl"] = event.target.result;
            };

            fileReader.readAsDataURL(file[0]);
        }
    };

    const updateUserData = async (userData) => {
        let userToPost = !!userData ? userData : user;
        if (userToPost.userType === tourOperator) {
            userToPost = tourOperatorMapper(userToPost);
        }
        let invalidData;

        if (userToPost.userType === tourOperator) {
            invalidData = Object.keys(userToPost.tourBusinessEntity)
                .filter((key) => !userToPost.tourBusinessEntity[key])
                .concat(
                    Object.keys(userToPost.tourOperatorEntity).filter(
                        (key) => !userToPost.tourOperatorEntity[key]
                    )
                );
        } else {
            invalidData = Object.keys(userToPost).filter(
                (key) => !userToPost[key]
            );
        }

        if (invalidData.length) {
            notifier.danger("Please fill all the fields", 3000);
            return;
        }

        const LS_AUTH_TOKEN_KEY = "seeyou_auth_token";
        const token = localStorage.getItem(LS_AUTH_TOKEN_KEY);
        const userUpdateRes = await fetch(`${BASE_ROUTE}/user`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ user: userToPost }),
        });

        if (userUpdateRes.status === 200) {
            notifier.success("Profile updated successfully", 3000);
            return;
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
                profilePictureUrl={user.profilePictureUrl}
                firstName={user.firstName ? user.firstName : ""}
                lastName={user?.lastName ? user?.lastName : ""}
                email={user?.email ? user?.email : ""}
                onChangeprofilePictureUrl={() => previewImage()}
                onUploadprofilePictureUrl={(imgSrc) =>
                    updateProfilePhoto(imgSrc)}
            />

            <div class="notification-display">
                <NotificationDisplay />
            </div>
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
                                user["firstName"] = e.target.value;
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
                                (user["lastName"] = e.target.value)}
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
                            type="number"
                            onChange={(e) =>
                                (user["phoneNumber"] = e.target.value)}
                        />
                    </div>
                    <div class="half-row">
                        <Input
                            label={"City"}
                            className="half-row"
                            onChange={(e) => (user["city"] = e.target.value)}
                            value={user?.city ? user.city : ""}
                        />
                    </div>
                </div>
            </div>

            <div class="center-row">
                {#if user.userType === promoter || user.userType === concierge}
                    <div class="form-row">
                        <div class="half-row">
                            <Input
                                label={"Country"}
                                value={user.country ? user.country : ""}
                                className="half-row"
                                name="pla"
                                onChange={(e) =>
                                    (user["country"] = e.target.value)}
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
                                    (user["foreignLanguages"] = e.target.value)}
                            />
                        </div>
                    </div>
                {:else}
                    <div class="form-row">
                        <div class="full-row">
                            <Input
                                label={"Foreign Languages"}
                                value={user.foreignLanguages
                                    ? user.foreignLanguages
                                    : ""}
                                className="half-row"
                                name="pla"
                                onChange={(e) =>
                                    (user["foreignLanguages"] = e.target.value)}
                            />
                        </div>
                    </div>
                {/if}
            </div>

            {#if user.userType === tourOperator}
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
                                    (user["businessName"] = e.target.value)}
                            />
                        </div>
                        <div class="half-row">
                            <Input
                                label={"Business Website"}
                                className="half-row"
                                name="pla"
                                value={user.website ? user.website : ""}
                                onChange={(e) =>
                                    (user["website"] = e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div class="center-row">
                    <div class="form-row">
                        <div class="half-row">
                            <Input
                                label={"Cui"}
                                className="half-row"
                                name="pla"
                                onChange={(e) => (user["cui"] = e.target.value)}
                                value={user.cui ? user.cui : ""}
                            />
                        </div>
                        <div class="half-row">
                            <Input
                                label={"Adress"}
                                className="half-row"
                                name="pla"
                                onChange={(e) =>
                                    (user["adress"] = e.target.value)}
                                value={user.adress ? user.adress : ""}
                            />
                        </div>
                    </div>
                </div>

                <div class="center-row">
                    <div class="form-row">
                        <div class="half-row">
                            <Textarea
                                label={"Business Social Links"}
                                className="half-row"
                                name="pla"
                                onChange={(e) =>
                                    (user["socialLinks"] = e.target.value)}
                                value={user.socialLinks ? user.socialLinks : ""}
                            />
                        </div>
                        <div class="half-row">
                            <Textarea
                                label={"User Social Links"}
                                className="half-row"
                                name="pla"
                                onChange={(e) =>
                                    (user["userSocialLinks"] = e.target.value)}
                                value={user.userSocialLinks
                                    ? user.userSocialLinks
                                    : ""}
                            />
                        </div>
                    </div>
                </div>
            {/if}

            {#if user.userType === promoter}
                <div class="center-row">
                    <div class="form-row">
                        <div class="half-row">
                            <Input
                                label={"Current Job"}
                                className="half-row"
                                name="pla"
                                onChange={(e) =>
                                    (user["currentJob"] = e.target.value)}
                                value={user.currentJob ? user.currentJob : ""}
                            />
                        </div>
                        <div class="half-row">
                            <Textarea
                                label={"Social Links"}
                                className="half-row"
                                name="pla"
                                onChange={(e) =>
                                    (user["socialLinks"] = e.target.value)}
                                value={user.socialLinks ? user.socialLinks : ""}
                            />
                        </div>
                    </div>
                </div>
            {/if}
            {#if user.userType === promoter || user.userType === contentCreator}
                <div class="center-row">
                    <div class="form-row">
                        <Textarea
                            label={"Disponibility Description"}
                            className="half-row"
                            name="pla"
                            onChange={(e) =>
                                (user["disponibilityDescription"] =
                                    e.target.value)}
                            value={user.disponibilityDescription
                                ? user.disponibilityDescription
                                : ""}
                        />
                    </div>
                </div>
            {/if}

            {#if user.userType === contentCreator}
                <div class="center-row">
                    <div class="form-row">
                        <div class="full-row">
                            <Textarea
                                label={"Social Links"}
                                className="half-row"
                                name="pla"
                                onChange={(e) =>
                                    (user["socialLinks"] = e.target.value)}
                                value={user.socialLinks ? user.socialLinks : ""}
                            />
                        </div>
                    </div>
                </div>
            {/if}
            {#if user.userType === concierge}
                <div class="center-row">
                    <div class="form-row">
                        <Textarea
                            label={"Social Links"}
                            className="half-row"
                            name="pla"
                            onChange={(e) =>
                                (user["socialLinks"] = e.target.value)}
                            value={user.socialLinks ? user.socialLinks : ""}
                        />
                    </div>
                </div>
            {/if}

            <button
                class="main-button cta-button"
                on:click={() => updateUserData()}>{"Update"}</button
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
        flex: 1;
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

    .notification-display {
        position: absolute;
        left: 30px;
        bottom: 30px;
    }
    @media only screen and (max-width: 600px) {
        .home-page-container {
            padding: 80px 15px;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .left-card {
            width: 80%;
        }
        .right-card {
            margin: 20px 0px;
            width: 100%;
            padding: 20px;
            min-width: auto;
        }
    }
</style>
