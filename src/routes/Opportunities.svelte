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
    import StatusBadge from "./widgets/StatusBadge.svelte";
    import LastRange from "./widgets/LastRange.svelte";
    import { makeRequest } from "./utils/req";
    import { OpportunityStore } from "./utils/store";
    import { Opportunities } from "./models/opportunity";
    import { OPPS_LIMIT } from "./utils/constants";

    let dark = false;
    let opportunities = Opportunities.create();

    OpportunityStore.subscribe((value) => {
        opportunities = value;
    });

    makeRequest(`recommend?limit=${OPPS_LIMIT}`, null, null, false)
        .then((res) => {
            OpportunityStore.set(Opportunities.fromJSON(res));
        })
        .catch((err) => {
            console.error(err);
        });

    const headers = ["Ticker", "Order Type", "Default Price", "Score"];
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
        class="mt-6 min-w-full divide-y divide-gray-200 dark:divide-gray-600 table-fixed relative overflow-y-auto"
    >
        <TableHead class="bg-gray-50 dark:bg-gray-700">
            {#each headers as header}
                <TableHeadCell
                    class="whitespace-nowrap p-4 font-normal sticky top-0 scope='col'"
                    >{header}</TableHeadCell
                >
            {/each}
        </TableHead>
        <TableBody class="hover:bg-gray-50 dark:hover:bg-gray-600 h-96">
            {#each opportunities.getOpportunities() as opp}
                <TableBodyRow>
                    <TableBodyCell class="px-4 font-normal"
                        >{opp.ticker}</TableBodyCell
                    >
                    <TableBodyCell
                        class="px-4 font-normal text-gray-500 dark:text-gray-400"
                    >
                        <StatusBadge
                            state={opp.order_type === 1 ? "long" : "short"}
                            {dark}
                        />
                    </TableBodyCell>
                    <TableBodyCell class="px-4"
                        >{opp.default_price}</TableBodyCell
                    >
                    <TableBodyCell
                        class="px-4 font-normal  text-gray-500 dark:text-gray-400"
                    >
                        {opp.score.toFixed(2)}
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
    <div class="-mb-1 flex items-center justify-between pt-3 sm:pt-6">
        <LastRange />
    </div>
</Card>
