<script lang="ts">
    import { Card, Heading } from "flowbite-svelte";
    import StatusBadge from "./widgets/StatusBadge.svelte";
    import { makeRequest } from "./utils/req";
    import { OpportunityStore } from "./utils/store";
    import { Opportunities } from "./models/opportunity";
    import { OPPS_LIMIT } from "./utils/constants";
    import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
    import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
    import AgGrid from "@budibase/svelte-ag-grid";
    import { cellRendererFactory } from "./utils/renderer";
    import { options } from "./config/table_options";

    let opportunities = Opportunities.create();
    let data: any = [];

    OpportunityStore.subscribe((value) => {
        opportunities = value;
    });

    let columnDefs = [
        {
            headerName: "Ticker",
            field: "ticker",
            sortable: true,
        },
        {
            headerName: "Order Type",
            field: "order_type",
            sortable: true,
            cellRenderer: cellRendererFactory((c, p) => {
                new StatusBadge({
                    target: c.eGui,
                    props: {
                        state: p.value,
                    },
                });
            }),
        },
        {
            headerName: "Default Price",
            field: "default_price",
            sortable: true,
        },
        { headerName: "Score", field: "score", sortable: true },
    ];

    makeRequest(`recommend?limit=${OPPS_LIMIT}`, null, null, false)
        .then((res) => {
            OpportunityStore.set(Opportunities.fromJSON(res));
            data = opportunities.getOpportunities().map((opp) => {
                return {
                    ticker: opp.ticker,
                    order_type: opp.order_type === 1 ? "long" : "short",
                    default_price: opp.default_price.toFixed(2),
                    score: opp.score.toFixed(2),
                };
            });
        })
        .catch((err) => {
            console.error(err);
        });
</script>

<Card size="xl" class="shadow-sm">
    <div class="items-center justify-between lg:flex relative overflow-y-auto">
        <div class="mb-4 mt-px lg:mb-0">
            <Heading
                tag="h3"
                class="-ml-0.25 mb-2 text-xl font-semibold dark:text-white"
            >
                Opportunities
            </Heading>
            <span
                class="text-base font-normal text-gray-500 dark:text-gray-400"
            >
                This is a list of recommended positions for your portfolio
            </span>
        </div>
    </div>
    <AgGrid bind:data {columnDefs} {options} />
</Card>

<style>
    :global(:root) {
        --grid-height: 500px;
    }
</style>
