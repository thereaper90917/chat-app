import { writable } from "svelte-local-storage-store";
import { derived } from 'svelte/store';

// First param `preferences` is the local storage key.
// Second param is the initial value.
export const preferences = writable("preferences", {
  user: "",
});


export const isLoggedIn = derived(false, preferences => preferences.user !== "");