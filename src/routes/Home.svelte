<script>
    import Portfolio from "./Portfolio.svelte";
    import Positions from "./Positions.svelte";
    import Opportunities from "./Opportunities.svelte";
    import EnterPosition from "./EnterPosition.svelte";
    import ExitPosition from "./ExitPosition.svelte";
    import StockAnalysis from "./StockAnalysis.svelte";
    import { Button } from "flowbite-svelte";

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
</script>

<div class="grid-container">
    <Button class="absolute top-4 right-4" on:click={logout} color="blue">
        Logout
    </Button>

    <div class="grid-item">
        <Portfolio />
    </div>
    <div class="grid-item">
        <div class="positions-container">
            <div class="button-container">
                <EnterPosition />
                <div style="margin-left: 10px;"></div>
                <ExitPosition />
            </div>
            <Positions />
        </div>
    </div>
    <div class="grid-item">
        <Opportunities />
    </div>

    <div class="grid-item">
        <StockAnalysis />
    </div>
</div>

<style>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 10px; /* Adjusted gap to 10px */
        height: 100vh; /* Make the grid container take up the full viewport height */
        padding: 10px; /* Add padding to the grid container */
        box-sizing: border-box; /* Ensure padding is included in the element's total width and height */
    }
    .grid-item {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box; /* Ensure padding is included in the element's total width and height */
        height: 100%; /* Ensure grid items take up the full height of their container */
    }
    .grid-item > * {
        width: 100%;
        height: 100%;
    }
    .positions-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    .button-container {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 10px; /* Add some space between the button and the Positions widget */
    }
</style>
