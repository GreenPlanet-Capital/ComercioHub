<script>
    import { Button } from "flowbite-svelte";
    import { MinusOutline } from "flowbite-svelte-icons";
    import ManagePositions from "./ManagePositions.svelte";

    let openUser = false;
</script>

<div class="flex items-center space-x-2">
    <Button
        size="sm"
        color="yellow"
        class="gap-2 whitespace-nowrap px-3 color-purple"
        on:click={() => (openUser = true)}
    >
        <MinusOutline size="sm" color="black" />
        <div class="text-black">Exit Position</div>
    </Button>
</div>

<ManagePositions bind:open={openUser} data="exit" />
