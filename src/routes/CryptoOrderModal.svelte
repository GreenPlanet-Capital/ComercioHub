<script lang="ts">
    import { Alert, Button, Modal, Textarea } from "flowbite-svelte";
    import { makeRequest } from "./utils/req";

    export let open: boolean = false; // modal control
    let uidString = "";
    let errMessage = "";
    let isWrongUIDString = false;

    function init(_: HTMLFormElement) {}
    export const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);

    const buttonClick = () => {
        makeRequest(
            "crypto/confirm-order",
            {
                uid_string: uidString,
            },
            null,
            false,
        )
            .then((res) => {
                console.log(res);
                open = false; // Close the modal on success
            })
            .catch((err) => {
                console.error(err);
                errMessage = err.detail;
                isWrongUIDString = true;
            });
    };
</script>

<Modal
    bind:open
    title={`Confirm Crypto Order from StratDaemon`}
    size="md"
    class="m-4"
>
    <!-- Modal body -->
    <div class="space-y-6 p-0">
        <form action="#" use:init>
            <Textarea
                class="textarea"
                rows={4}
                placeholder="Enter whole UID string from SMS"
                bind:value={uidString}
                required
            />
        </form>
    </div>

    {#if isWrongUIDString}
        <Alert>
            <p class="text-sm text-red-500 dark:text-red-400">
                {errMessage}
            </p>
        </Alert>
    {/if}

    <!-- Modal footer -->
    <div slot="footer">
        <Button
            type="submit"
            color="blue"
            class="w-full"
            on:click={buttonClick}
        >
            Confirm Order</Button
        >
    </div>
</Modal>
