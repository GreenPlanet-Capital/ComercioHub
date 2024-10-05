<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import type { BadgeProps } from 'flowbite-svelte/Badge.svelte';

	export let state: keyof typeof states;
	export let dark: boolean = false;

	const states = {
		buy: 'buy',
		sell: 'Canceled',
	};

	const colors: Record<string, BadgeProps['color']> = {
		buy: 'green',
		sell: 'red',
	};
</script>

<Badge color={colors[state] ?? 'dark'} border={dark}>{states[state] ?? 'Unknown'}</Badge>