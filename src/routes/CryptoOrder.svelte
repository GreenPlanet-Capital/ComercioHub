<script>
    import { Button } from "flowbite-svelte";
    import { PlusOutline } from "flowbite-svelte-icons";
    import CryptoOrderModal from "./CryptoOrderModal.svelte";

    let openUser = false;
</script>

<div class="flex items-center space-x-2">
    <Button
        size="sm"
        color="blue"
        class="gap-2 whitespace-nowrap px-3 color-blue"
        on:click={() => (openUser = true)}
    >
        <PlusOutline size="sm" />Confirm Crypto Order
    </Button>
</div>

<CryptoOrderModal bind:open={openUser} />
