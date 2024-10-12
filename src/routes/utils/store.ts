import { writable } from "svelte/store";
import { Portfolio } from "../models/portfolio";
import { Positions } from "../models/position";
import { Opportunities } from "../models/opportunity";
import { makeRequest } from "./req";

export const PortfolioStore = writable(Portfolio.create());
export const PositionStore = writable(Positions.create());
export const OpportunityStore = writable(Opportunities.create());

export const fetchPositions = () => {
    makeRequest("position", null, null, false)
        .then((res) => {
            PositionStore.set(Positions.fromJSON(res));
        })
        .catch((err) => {
            console.error(err);
        });
}

export const fetchPortfolio = () => {
    makeRequest("portfolio", null, null, false)
        .then((res) => {
            PortfolioStore.set(Portfolio.fromJSON(res));
        })
        .catch((err) => {
            console.error(err);
        });
}