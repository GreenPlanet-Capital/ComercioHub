<script>
    import { makeRequest } from "./utils/req";
    import { Portfolio } from "./models/portfolio";
    import { PortfolioStore } from "./utils/store";
    
    let portfolio = Portfolio.create();

    PortfolioStore.subscribe((value) => {
        portfolio = value;
    });

    makeRequest("portfolio", null, null, false)
        .then((res) => {
            PortfolioStore.set(Portfolio.fromJSON(res));
        })
        .catch((err) => {
            console.error(err);
        });
    
</script>

<h1>Portfolio</h1>

<h2>
    {portfolio.value}
</h2>
