
export class History {
    timestamp: string;
    value: number;

    constructor(
        date: string,
        value: number
    ) {
        this.timestamp = date;
        this.value = value;
    }

    static fromJSON(json: any): History {
        return new History(
            json.timestamp,
            json.value
        );
    }
}

export class Portfolio {
    value: number;
    history: History[];
    snp: number[];
    buy_power: number = 0;

    constructor(
        value: number,
        history: History[],
        snp: number[],
        buy_power: number
    ) {
        this.history = history;
        this.value = value;
        this.snp = snp;
        this.buy_power = buy_power;
    }

    static create(
    ): Portfolio {
        return new Portfolio(0, [], [], 0);
    }

    static fromJSON(json: any): Portfolio {
        return new Portfolio(
            json.value,
            json.history.map((history: any) => History.fromJSON(history)),
            json.snp,
            json.buy_power
        );
    }
}