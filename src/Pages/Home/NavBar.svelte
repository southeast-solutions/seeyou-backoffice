<script>
    import { navigate } from "svelte-routing";

    const onUsersPressed = () => {
        navigate("/users", { replace: false });
    };
    const onExperiencesPressed = () => {
        navigate("/experiences", { replace: false });
    };
    const onProfilePressed = () => {
        navigate("/profile", { replace: false });
    };
</script>

<div class="nav-container">
    <div class="logo-container">
        <img src="logo.png" alt="page-logo" class="logo" />
    </div>
    <div class="buttons-container">
        <div class="nav-button" on:click={onUsersPressed}>
            <i class="fi fi-rr-user-add" /> Users
        </div>
        <div class="nav-button" on:click={onExperiencesPressed}>
            <i class="fi fi-rr-world" />Experiences
        </div>
        <div class="nav-button" on:click={onProfilePressed}>
            <i class="fi fi-rr-user" />Profile
        </div>
    </div>
</div>

<style>
    .nav-container {
        position: absolute;
        width: 100%;
        height: 80px;
        background-color: #e8e7e2;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .logo-container {
        padding: 10px;
    }
    .buttons-container {
        height: 100%;
        display: flex;
        flex-direction: row;
    }
    .nav-button {
        transition: 0.5s;
        user-select: none;
        cursor: pointer;
        height: 100%;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        font-weight: 200;
    }
    .nav-button > i {
        height: 30px;
        width: auto;
        margin-right: 5px;
    }
    .nav-button:hover {
        background-color: #223d4f;
        color: white;
    }
</style>
