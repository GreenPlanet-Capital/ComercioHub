<script>

    import { Button } from "flowbite-svelte";
    import { PlusOutline } from "flowbite-svelte-icons";
    import ManagePositions from "./ManagePositions.svelte";

    let openUser = false;

</script>

<div class="flex items-center space-x-2">
    <Button
        size="sm"
        class="gap-2 whitespace-nowrap px-3"
        on:click={() => ((openUser = true))}
    >
        <PlusOutline size="sm" />Enter Position
    </Button>
</div>

<ManagePositions bind:open={openUser} data="enter" />