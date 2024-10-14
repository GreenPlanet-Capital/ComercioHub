<script lang="ts">
	import {
		Alert,
		Button,
		Input,
		Label,
		Modal,
		Select,
	} from "flowbite-svelte";
	import { makeRequest } from "./utils/req";
	import { fetchPortfolio, fetchPositions } from "./utils/store";
	import { onMount } from "svelte";
	export let open: boolean = false; // modal control
	export let data: "enter" | "exit" = "enter";
	let showBuy = true;
	let ticker = "";
	let amount = 0;

	let isWrongCredentials = false;
	let errMessage = "";

	let tickers: string[] = [];

	onMount(async () => {
		await makeRequest("stock/list", null, null, false)
			.then((res) => {
				tickers = res.map((stock: string) => ({
					value: stock,
					name: stock,
				}));
			})
			.catch((err) => {
				console.error(err);
			});
	});

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
				open = false;
				fetchPositions();
				fetchPortfolio();
			})
			.catch((err) => {
				isWrongCredentials = true;
				errMessage = err.detail;
			});
	};
</script>

<Modal bind:open title={`${capitalize(data)} position`} size="md" class="m-4">
	<!-- Modal body -->
	<div class="space-y-6 p-0">
		<form action="#" use:init>
			<div class="grid grid-cols-6 gap-6">
				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>Ticker</span>
					<Select
						class="mt-2"
						items={tickers}
						bind:value={ticker}
						placeholder="Select a ticker"
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
					<span>Amount ($)</span>
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

	{#if isWrongCredentials}
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
			{capitalize(data)} Position</Button
		>
	</div>
</Modal>
