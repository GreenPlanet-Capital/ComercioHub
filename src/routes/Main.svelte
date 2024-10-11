<script lang="ts">
    import { onMount } from "svelte";
    import Home from "./Home.svelte";
    import Login from "./Login.svelte";
    import RegisterAccount from "./RegisterAccount.svelte";
    import { makeRequest } from "./utils/req";

    import { viewStore } from "./ViewStore";

    async function checkAuth() {
        await makeRequest("user/view", null, null, false)
            .then((res) => {
                console.log(res);
                $viewStore.current = $viewStore.home;
            })
            .catch((err) => {
                console.error(err);
                $viewStore.current = $viewStore.login;
            });
    }

    onMount(async () => {
        await checkAuth();
    });
</script>

{#if $viewStore.current === $viewStore.home}
    <Home />
{:else if $viewStore.current === $viewStore.login}
    <Login />
{:else if $viewStore.current === $viewStore.register}
    <RegisterAccount />
{/if}
