import { writable } from "svelte/store";
import { Portfolio } from "../models/portfolio";
import { Order, Position, Positions } from "../models/position";

export const PortfolioStore = writable(Portfolio.create());
export const PositionStore = writable(Positions.create());

export function addPosition(ticker: string, orders: Order[]): void {
    PositionStore.update((store) => {
        store.addPosition(new Position(ticker, orders));
        return store;
    });
}