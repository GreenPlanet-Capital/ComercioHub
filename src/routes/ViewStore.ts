import { writable } from "svelte/store";

export const viewStore = writable({
    login: 0,
    register: 1,
    home: 2,
});