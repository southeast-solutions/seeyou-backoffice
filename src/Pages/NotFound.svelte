<script>
    import { fade } from "svelte/transition";
</script>

<div class="page-container" in:fade>
    <div class="page-title">404 <i class="fi fi-rr-cross-circle" /></div>
    <div class="page-description">
        There's nothing here. The page you are searching for does not exist
        (yet, at least)
    </div>
</div>

<style>
    .page-title {
        font-size: 48px;
        font-weight: bold;
        color: #549c79;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .page-description {
        font-size: 32px;
        font-weight: 200;
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
    i {
        margin-left: 10px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
