<script lang="ts">
    import {
        Button,
        Card,
        Checkbox,
        Dropdown,
        Heading,
        Input,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
    } from "flowbite-svelte";
    import {
        CalendarMonthOutline,
        ChevronDownOutline,
        ChevronRightOutline,
    } from "flowbite-svelte-icons";
    import CreditCard from "./widgets/CreditCard.svelte";
    import StatusBadge from "./widgets/StatusBadge.svelte";
    import LastRange from "./widgets/LastRange.svelte";
    import { makeRequest } from "./utils/req";
    import { Positions } from "./models/position";
    import { PositionStore } from "./utils/store";

    let dark = false;
    let positions = Positions.create();

    PositionStore.subscribe((value) => {
        positions = value;
    });

    makeRequest("position", null, null, false)
        .then((res) => {
            PositionStore.set(Positions.fromJSON(res));
        })
        .catch((err) => {
            console.error(err);
        });

    const headers = ["Ticker", "Order Type", "Quantity", "Default Price"];
</script>

<Card size="xl" class="shadow-sm max-w-none">
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
        <div
            class="items-center justify-between gap-3 space-y-4 sm:flex sm:space-y-0"
        >
            <div class="flex items-center">
                <Button
                    color="alternative"
                    class="w-fit whitespace-nowrap px-4 py-2"
                >
                    Filter by status
                    <ChevronDownOutline size="lg" />
                </Button>
                <Dropdown
                    class="w-44 space-y-3 p-3 text-sm"
                    placement="bottom-start"
                >
                    <li>
                        <Checkbox class="accent-primary-600"
                            >Completed (56)</Checkbox
                        >
                    </li>
                    <li><Checkbox checked>Cancelled (56)</Checkbox></li>
                    <li>
                        <Checkbox class="accent-primary-600"
                            >In progress (56)</Checkbox
                        >
                    </li>
                    <li><Checkbox checked>In review (97)</Checkbox></li>
                </Dropdown>
            </div>
            <div class="flex items-center space-x-4">
                <Input placeholder="From" class="w-full">
                    <CalendarMonthOutline slot="left" size="md" />
                </Input>
                <Input placeholder="To" class="w-full">
                    <CalendarMonthOutline slot="left" size="md" />
                </Input>
            </div>
        </div>
    </div>
    <Table
        hoverable={true}
        noborder
        striped
        class="mt-6 min-w-full divide-y divide-gray-200 dark:divide-gray-600"
    >
        <TableHead class="bg-gray-50 dark:bg-gray-700">
            {#each headers as header}
                <TableHeadCell class="whitespace-nowrap p-4 font-normal"
                    >{header}</TableHeadCell
                >
            {/each}
        </TableHead>
        <TableBody>
            {#each positions.getPositions() as pos}
                <TableBodyRow>
                    <TableBodyCell class="px-4 font-normal"
                        >{pos.ticker}</TableBodyCell
                    >
                    <TableBodyCell
                        class="px-4 font-normal text-gray-500 dark:text-gray-400"
                    >
                        <StatusBadge
                            state={pos.getOrders()[0].order_type === 1
                                ? "buy"
                                : "sell"}
                            {dark}
                        />
                    </TableBodyCell>
                    <TableBodyCell class="px-4"
                        >{pos
                            .getOrders()[0]
                            .default_price.toFixed(2)}</TableBodyCell
                    >
                    <TableBodyCell
                        class="px-4 font-normal  text-gray-500 dark:text-gray-400"
                    >
                        {pos.getOrders()[0].quantity.toFixed(2)}
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
    <div class="-mb-1 flex items-center justify-between pt-3 sm:pt-6">
        <LastRange />
    </div>
</Card>
