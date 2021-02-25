<script>
    import { navigate } from "svelte-routing";
    import { onMount } from "svelte";
    import {
        login,
        guardUnsignedUser,
        setAuthLocalStorage,
    } from "../../Services/AuthService";
    const invalidLogin = "Username or password are invalid";

    const loginMessage = "Sign in";
    const loadingMessage = "Loading";

    let loginButtonMessage = loginMessage;

    let inputLogin = "";
    let inputPassword = "";

    let errorMessage = "";

    onMount(() => {
        guardUnsignedUser();
    });

    const signInClicked = () => {
        console.log({ inputLogin, inputPassword });
        loginButtonMessage = loadingMessage;
        errorMessage = "";
        login({ email: inputLogin, password: inputPassword })
            .then(() => {
                loginButtonMessage = loginMessage;
                errorMessage = "";
                setAuthLocalStorage("boss", "token");
            })
            .catch(() => {
                loginButtonMessage = loginMessage;
                errorMessage = invalidLogin;
            });
    };

    const signUpClicked = () => {
        navigate("/register");
    };
</script>

<div class="page-container">
    <div class="form-container">
        <img src="logo.png" alt="login-img" class="logo-img" />
        <div class="inputs-container">
            <h2>Login</h2>
            <div class="input-label">Email</div>
            <input
                type="text"
                class="form-input"
                placeholder="Email"
                bind:value={inputLogin}
            />
            <div class="input-label">Password</div>
            <input
                type="password"
                class="form-input"
                placeholder="Password"
                bind:value={inputPassword}
            />
        </div>
        {#if errorMessage !== ""}
            <div class="error-message">{errorMessage}</div>
        {/if}
        <button class="main-button cta-button" on:click={signInClicked}
            >{loginButtonMessage}</button
        >
        <button class="secondary-button cta-button" on:click={signUpClicked}
            >Sign Up</button
        >
        <a href="/">Forgot your password?</a>
    </div>
    <div class="info-container">
        <h1>Lorem ipsum title</h1>
        <h3>
            Bender?! You stole the atom. I daresay that Fry has discovered the
            smelliest object in the known universe! I've got to find a way to
            escape the horrible ravages of youth. Suddenly, I'm going to the
            bathroom like clockwork, every three hours. And those jerks at
            Social Security stopped sending me checks. Now 'I'' have to pay
            ''them'! No! The cat shelter's on to me. I'll tell them you went
            down prying the wedding ring off his cold, dead finger. That could
            be 'my' beautiful soul sitting naked on a couch. If I could just
            learn to play this stupid thing.
        </h3>
    </div>
</div>

<style>
    .page-container {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: row;
    }
    .form-container {
        height: 100%;
        width: 40%;
        background-color: #e8e7e2;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
    }
    .info-container {
        height: 100%;
        width: 60%;
        background: url("../login-background.png") no-repeat center center fixed;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        padding: 0 40px;
        overflow-y: auto;
    }
    h1 {
        font-weight: bold;
        font-size: 48px;
        color: white;
    }
    h2 {
        color: #223d4f;
        font-weight: 300;
        font-size: 32px;
        margin-top: 10px;
    }
    h3 {
        font-weight: 300;
        font-size: 32px;
        color: white;
        text-align: end;
    }
    .logo-img {
        margin-top: 20px;
        width: 30%;
        height: auto;
    }
    .cta-button {
        width: 60%;
        height: 50px;
        margin-top: 10px;
        font-size: 16px;
    }
    .inputs-container {
        width: 80%;
        margin-bottom: 10px;
    }
    .form-input {
        width: 100%;
        height: 50px;
    }
    a {
        margin: 10px 0;
    }
    .input-label {
        font-weight: bold;
        font-size: 14px;
    }
    .error-message {
        color: red;
        font-size: 18px;
    }
</style>
