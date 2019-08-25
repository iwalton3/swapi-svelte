import { writable } from 'svelte/store';
import conf from './conf.js';

export function localStore(name, initial) {
    const key = `${conf.localStoragePrefix}_${name}`;
    const data = window.localStorage.getItem(key);
    
    if (data) {
        initial = JSON.parse(data);
    }

    const {set, update, subscribe} = writable(initial);
    subscribe(value => {
        window.localStorage.setItem(key, JSON.stringify(value));
    });
    
    return {
        set,
        update,
        subscribe
    }
}

export const darkTheme = localStore("dark", false);
