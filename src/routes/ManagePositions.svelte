<script lang="ts">
	import { Button, Input, Label, Modal } from "flowbite-svelte";
	import { makeRequest } from "./utils/req";
	export let open: boolean = false; // modal control
	export let data: "enter" | "exit" = "enter";
	let showBuy = true;
	let ticker = "";
	let amount = 0;

	function init(_: HTMLFormElement) {}
	export const capitalize = (str: string) =>
		str.charAt(0).toUpperCase() + str.slice(1);

	const buttonClick = () => {
		makeRequest(
			`position/${data}`,
			{
				ticker: ticker,
				amount: amount,
				order_type: showBuy ? 1 : 0,
			},
			null,
			false,
		)
			.then((res) => {
				console.log(res);
				// TODO: dynamically update positions
				open = false;
			})
			.catch((err) => {
				console.error(err);
				// TODO: let user know of error
			});
	};
</script>

<Modal bind:open title={`${capitalize(data)} position`} size="md" class="m-4">
	<!-- Modal body -->
	<div class="space-y-6 p-0">
		<form action="#" use:init>
			<div class="grid grid-cols-6 gap-6">
				<!-- TODO: fetch list from backend and show as selection instead -->
				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>Ticker</span>
					<Input
						name="ticker"
						class="border outline-none"
						placeholder="e.g. AAPL"
						required
						bind:value={ticker}
					/>
				</Label>
				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span class="flex justify-between">Order Type</span>
					{#if showBuy}
						<Button
							type="button"
							class="bg-green-500 text-white hover:bg-green-600"
							on:click={() => {
								showBuy = false;
							}}
						>
							Long
						</Button>
					{:else}
						<Button
							type="button"
							class="bg-red-500 text-white hover:bg-red-600"
							on:click={() => {
								showBuy = true;
							}}
						>
							Short
						</Button>
					{/if}
				</Label>
				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>Amount</span>
					<Input
						name="amount"
						type="number"
						prefix="$"
						class="border outline-none"
						required
						bind:value={amount}
					/>
				</Label>
			</div>
		</form>
	</div>

	<!-- Modal footer -->
	<div slot="footer">
		<Button
			type="submit"
			color="blue"
			class="w-full"
			on:click={buttonClick}
		>
			{capitalize(data)} Position</Button
		>
	</div>
</Modal>
