<script>
    import { makeRequest } from "./utils/req";
    import { Portfolio } from "./models/portfolio";
    import { PortfolioStore } from "./utils/store";
    import ChartWidget from "./widgets/ChartWidget.svelte";
    import getChartOptions from "./config/chart_options";
    import Change from "./widgets/Change.svelte";

    let portfolio = Portfolio.create();
    let chartOptions = getChartOptions(false);

    /**
     * @param {number} num
     * @param {number} precision
     */
    function roundTo(num, precision) {
        const factor = Math.pow(10, precision);
        return Math.round(num * factor) / factor;
    }
    const percentDiff = (/** @type {number} */ a, /** @type {number} */ b) => {
        let sol = ((a - b) / b) * 100;
        return roundTo(sol, 2);
    };

    PortfolioStore.subscribe((new_portfolio) => {
        portfolio = new_portfolio;
        chartOptions.series = [
            {
                name: "",
                data: portfolio.history.map((item) => {
                    return {
                        x: new Date(item.date).getTime(),
                        y: item.value,
                    };
                }),
            },
        ];
    });

    makeRequest("portfolio", null, null, false)
        .then((res) => {
            PortfolioStore.set(Portfolio.fromJSON(res));
            console.log(Portfolio.fromJSON(res));
        })
        .catch((err) => {
            console.error(err);
        });
</script>

<div class="mt-px space-y-4">
    <div class="grid gap-10 xl:grid-cols-2 2xl:grid-cols-1">
        <ChartWidget
            {chartOptions}
            title="${portfolio.value.toFixed(2)}"
            subtitle="Portfolio Value"
            percentChange={portfolio.history.length < 2
                ? 0
                : percentDiff(
                      portfolio.history[0].value,
                      portfolio.history[1].value,
                  )}
        />
    </div>
</div>
