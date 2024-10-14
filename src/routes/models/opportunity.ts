
export class Opportunity {
    ticker: string;
    order_type: number;
    default_price: number;
    score: number;

    constructor(
        ticker: string,
        order_type: number,
        default_price: number,
        score: number
    ) {
        this.ticker = ticker;
        this.order_type = order_type;
        this.default_price = default_price;
        this.score = score;
    }

    static fromJSON(json: any): Opportunity {
        return new Opportunity(
            json.ticker,
            json.order_type,
            json.default_price,
            json.metadata_score
        );
    }

    static create(): Opportunity {
        return new Opportunity("", 0, 0, 0);
    }
}


export class Opportunities {
    opportunities: Opportunity[];

    constructor(opportunities: Opportunity[]) {
        this.opportunities = opportunities;
    }

    static create(): Opportunities {
        return new Opportunities([]);
    }

    addOpportunity(opportunity: Opportunity): void {
        this.opportunities = [...this.opportunities, opportunity];
    }

    removeOpportunity(opportunity: Opportunity): void {
        this.opportunities = this.opportunities.filter((o) => o !== opportunity);
    }

    getOpportunity(ticker: string): Opportunity | undefined {
        return this.opportunities.find((o) => o.ticker === ticker);
    }

    getOpportunities(): Opportunity[] {
        return this.opportunities;
    }

    static fromJSON(json: any): Opportunities {
        return new Opportunities(
            json.map((opportunity: any) => Opportunity.fromJSON(opportunity))
        );
    }
}