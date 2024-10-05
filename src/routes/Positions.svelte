<script>
    import { makeRequest } from "./utils/req";
    import { Positions } from "./models/position";
    import { PositionStore } from "./utils/store";

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
</script>

{#if positions.getPositions().length > 0}
    <h1>Positions</h1>
    <table>
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Price bought</th>
                <th>Quantity</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            {#each positions.getPositions() as position}
                <tr>
                    <td>{position.ticker}</td>
                    {#if position.getOrders().length > 0}
                        <td>{position.getOrders()[0].default_price}</td>
                        <td>{position.getOrders()[0].quantity}</td>
                        <td>{position.getOrders()[0].order_type}</td>
                    {:else}
                        <td colspan="3">No shares</td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <h1>No Positions</h1>
{/if}
