import { writable } from "svelte/store";
import type { Mark } from "./routes/gameTypes";

export const markers = writable<Mark[]>([])
