<script>
    import { navigate } from "svelte-routing";
    import { onMount } from "svelte";
    import {
        login,
        guardUnsignedUser,
    } from "../../Services/AuthService";
import Input from "../../SharedComponents/Input.svelte";
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

    async function signInClicked() {
        loginButtonMessage = loadingMessage;
        errorMessage = "";
        const loginMessage = await login({email: inputLogin, password: inputPassword});

        if(!loginMessage) {
            loginButtonMessage = "Login"
            errorMessage = "Invalid email/password"
        } else {
            navigate('/profile')
        }
    };

    const signUpClicked = () => {
        navigate("/register");
    };
</script>

<div class="page-container">
    <div class="form-container">
        <img src="logo2.png" alt="login-img" class="logo-img" />

        <div class="inputs-container">
            <Input
                label="Email"
                type="text"
                placeholder="Email"
                onChange={(e) => inputLogin = e.target.value}
                value="" />
            <Input
                label="Password"
                type="password" 
                placeholder="Password"
                onChange={(e) => inputPassword = e.target.value}
                value="" />
          
        </div>
        {#if errorMessage !== ""}
        <div class="error-message">{errorMessage}</div>
    {/if}
    <button class="main-button cta-button" on:click={signInClicked}>{loginButtonMessage}</button>
    <button class="secondary-button cta-button" on:click={signUpClicked}>Sign Up</button>
    <a href="/" class="forgot-pass-message">Forgot your password?</a>
    </div>
  
</div>

<style>
    .page-container {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #cccccc;
        background-image: url('https://images.freecreatives.com/wp-content/uploads/2016/03/21074431/Tehran-Persia-Travel-Wallpaper.jpg');
        background-repeat: no-repeat, repeat;
        background-position: center; /* Center the image */
        background-repeat: no-repeat; /* Do not repeat the image */
        background-size: cover;

    }
    .form-container {
        height: 60%;
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        min-width: 300px;
    }

    .error-message {
        font-size: 16px;
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
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-content: center;
        width: 100%;
        margin-bottom: 30px;
        height: 21%;
        justify-content: space-between;
    }
   
 
    .error-message {
        color: red;
        font-size: 18px;
    }

    .forgot-pass-message {
        font-size: 14px;
        color: #019af6;
        margin-top: 10px;   
    }
</style>
