<script lang="ts">
    import { Card, Heading } from "flowbite-svelte";
    import StatusBadge from "./widgets/StatusBadge.svelte";
    import { Positions } from "./models/position";
    import { fetchPositions, PositionStore } from "./utils/store";
    import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
    import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
    import AgGrid from "@budibase/svelte-ag-grid";
    import { cellRendererFactory } from "./utils/renderer";
    import { options } from "./config/table_options";

    let positions = Positions.create();
    let data: any = [];

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
        {
            headerName: "Average Price",
            field: "avg_price",
            sortable: true,
        },
        {
            headerName: "PnL",
            field: "pnl",
            sortable: true,
        },
        {
            headerName: "Quantity",
            field: "quantity",
            sortable: true,
        },
    ];

    PositionStore.subscribe((value) => {
        positions = value;
        data = positions.getPositions().map((pos) => {
            const order = pos.getOrders()[0];
            return {
                ticker: pos.ticker,
                order_type: order.order_type === 1 ? "long" : "short",
                default_price: order.default_price.toFixed(2),
                avg_price: order.avg_price.toFixed(2),
                pnl: order.pnl.toFixed(2),
                quantity: order.quantity.toFixed(2),
            };
        });
    });

    fetchPositions();

    const headers = [
        "Ticker",
        "Order Type",
        "Avg Price",
        "Default Price",
        "pnl",
        "Quantity",
    ];
</script>

<Card size="xl" class="shadow-sm">
    <div class="items-center justify-between lg:flex">
        <div class="mb-4 mt-px lg:mb-0">
            <Heading
                tag="h3"
                class="-ml-0.25 mb-2 text-xl font-semibold dark:text-white"
            >
                Positions
            </Heading>
            <span
                class="text-base font-normal text-gray-500 dark:text-gray-400"
            >
                This is a list of current holdings in your portfolio
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
