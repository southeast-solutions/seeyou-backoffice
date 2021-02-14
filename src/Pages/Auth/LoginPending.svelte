<script>
    import { fade } from "svelte/transition";
</script>

<div class="page-container" in:fade>
    <div class="page-title">Pending account</div>
    <div class="page-description">
        Your account is still in review. Please check your inbox for any mail
        from us.
        <br />If you think this is a mistake then contact us at
        <a href="mailto:admin@seeyouromania.com">admin@seeyouromania.com</a>
    </div>
</div>

<style>
    .page-title {
        font-size: 42px;
        font-weight: bold;
        color: #549c79;
        margin-bottom: 10px;
    }
    .page-description {
        font-size: 24px;
        font-weight: 300;
        color: #223d4f;
    }
    .page-container {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #e8e7e2;
    }
</style>
