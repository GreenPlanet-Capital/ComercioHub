<script lang="ts">
    import { Card, Label, Input, Button, Heading } from "flowbite-svelte";
    import { makeRequest } from "./utils/req";
    import Plot, { type Data } from "svelte-plotly.js";
    import { RefreshOutline } from "flowbite-svelte-icons";
    import { onMount } from "svelte";

    let ticker = "AAPL";
    let showBuy = true;
    let data: Data[] = [];

    onMount(() => {
        buttonClick();
    });

    // Fetch the stock analysis data
    const buttonClick = () => {
        data = [];
        // TODO: pass in showBuy to have short options
        makeRequest(`stock/graph?ticker=${ticker}`, null, null, false)
            .then((res) => {
                data = JSON.parse(res);
            })
            .catch((err) => {
                console.error(err);
            });
        console.log("Button clicked");
    };
</script>

<Card size="xl" class="shadow-sm">
    <div class="justify-between lg:flex">
        <div class="mb-4 mt-px lg:mb-0">
            <Heading
                tag="h3"
                class="-ml-0.25 mb-2 text-xl font-semibold dark:text-white"
            >
                Stock Analysis
            </Heading>
            <span
                class="text-base font-normal text-gray-500 dark:text-gray-400"
            >
                This is a detailed analysis of the stock you are interested in
            </span>
        </div>

        <div class="flex items-center space-x-4 p-4">
            <Label class="space-y-2">
                <Input
                    name="ticker"
                    class="border outline-none"
                    placeholder="e.g. AAPL"
                    required
                    bind:value={ticker}
                />
            </Label>

            <div class="flex space-x-4 items-center">
                <Button
                    type="button"
                    class={showBuy
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-600"}
                    on:click={() => {
                        showBuy = !showBuy;
                    }}
                    style="width: 80px;"
                >
                    {showBuy ? "long" : "short"}
                </Button>
            </div>
            <Button
                class="bg-white-100 text-black hover:text-gray-100 hover:bg-gray-500"
                color="light"
                on:click={buttonClick}
            >
                <RefreshOutline size="lg" />
            </Button>
        </div>
    </div>

    {#if data.length === 0}
        <div class="flex items-center justify-center h-64">
            <span class="text-gray-500 dark:text-gray-400">
                Loading stock analysis data...
            </span>
        </div>
    {:else}
        <Plot
            {data}
            layout={{
                margin: { t: 0 },
            }}
            fillParent="width"
            debounce={250}
        />
    {/if}
</Card>
