import { writable } from "svelte/store";
import { Portfolio } from "../models/portfolio";
import { Positions } from "../models/position";
import { Opportunities } from "../models/opportunity";

export const PortfolioStore = writable(Portfolio.create());
export const PositionStore = writable(Positions.create());
export const OpportunityStore = writable(Opportunities.create());
