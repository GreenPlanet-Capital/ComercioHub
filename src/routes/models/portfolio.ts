
export class History {
    date: string;
    value: number;

    constructor(
        date: string,
        value: number
    ) {
        this.date = date;
        this.value = value;
    }

    static fromJSON(json: any): History {
        return new History(
            json[0],
            json[1]
        );
    }
}

export class Portfolio {
    value: number;
    history: History[];
    snp: number[];

    constructor(
        value: number,
        history: History[],
        snp: number[]
    ) {
        this.history = history;
        this.value = value;
        this.snp = snp;
    }

    static create(
    ): Portfolio {
        return new Portfolio(0, [], []);
    }

    static fromJSON(json: any): Portfolio {
        return new Portfolio(
            json.value,
            json.history.map((history: any) => History.fromJSON(history)),
            json.snp
        );
    }
}