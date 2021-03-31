<script>
import { BASE_ROUTE } from "../../Services/Constants";
import { navigate } from "svelte-routing";
import Input from "../../SharedComponents/Input.svelte";

let inputCode = "";
let inputEmail = "";
let errMessage = "";


const onConfirmCode = async (email, code) => {
    errMessage = ''
    const confirmResponse = await fetch(`${BASE_ROUTE}/identity/verifyregister`, {
        method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, code: code })
    }).then(res => res.json());


    if(confirmResponse.success) {
        navigate('/login')
    } else {
        errMessage = 'There was a problem'
    }
}
</script>

<div>
    <div class="page-container">
        <div class="form-container">
            <img src="logo2.png" alt="login-img" class="logo-img" />
    
            <div class="inputs-container">
                <Input
                    label="Code"
                    type="text"
                    placeholder="code.." 
                    onChange={(e) => inputCode = e.target.value}
                    value="" />
            <div class="extra-margin-top">
                <Input
                    label="Email"
                    type="text"
                    placeholder="email.." 
                    onChange={(e) => inputEmail = e.target.value}
                    value="" />

            </div>

            </div>
        <button class="secondary-button cta-button" on:click={() => onConfirmCode(inputEmail, inputCode)}>Confirm code</button>
            
        <span class="verication-code-text"> {!errMessage ? 'A verification code was sent to your email' : errMessage}</span>
    </div>
      
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

    .logo-img {
        margin-top: 20px;
        width: 30%;
        height: auto;
    }
    .cta-button {
        margin-top: 30px;
        width: 60%;
        height: 50px;
        font-size: 16px;
    }
    .inputs-container {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        align-content: center;
        width: 100%;
        margin-bottom: 20px;
        justify-content: space-between;
    }

    .extra-margin-top {
        margin-top: 20px;
    }

    .verication-code-text {
        margin-top: 30px;
        font-size: 14px;
        color: #019af6;
    }
</style>