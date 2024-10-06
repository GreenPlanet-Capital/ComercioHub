
export class Order {
    order_type: number;
    default_price: number;
    quantity: number;

    constructor(
        order_type: number,
        default_price: number,
        quantity: number
    ) {
        this.order_type = order_type;
        this.default_price = default_price;
        this.quantity = quantity;
    }

    static fromJSON(json: any): Order {
        return new Order(
            json.order_type,
            json.default_price,
            json.quantity
        );
    }
}

export class Position {
    ticker: string;
    orders: Order[];

    constructor(
        ticker: string,
        orders: Order[]
    ) {
        this.ticker = ticker;
        this.orders = orders;
    }

    static fromJSON(json: any): Position {
        return new Position(
            json.ticker,
            json.orders.map((order: any) => Order.fromJSON(order))
        );
    }

    getOrders(): Order[] {
        return this.orders;
    }
}

export class Positions {
    positions: Position[];

    constructor(
        positions: Position[]
    ) {
        this.positions = positions;
    }

    addPosition(position: Position): void {
        this.positions.push(position);
    }

    removePosition(ticker: string): void {
        this.positions = this.positions.filter((position) => position.ticker !== ticker);
    }

    static create(
    ): Positions {
        return new Positions([]);
    }

    static fromJSON(json: any): Positions {
        return new Positions(
            json.map((position: any) => new Position(
                position.ticker,
                position.orders.map((order: any) => Order.fromJSON(order))
            ))
        );
    }

    getPositions(): Position[] {
        return this.positions;
    }
}