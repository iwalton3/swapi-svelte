import { writable } from 'svelte/store';
import { check_user, login, send_otp, logoff, logoff_all } from '../api.js';

class Login {
    constructor() {
        this.capabilities = new Set();
        this.user = null;
        this.partialLogin = null;
    }

    has(capability) {
        return this.capabilities.has(capability);
    }

    async send_otp(user) {
        await send_otp(user);
        this.partialLogin = user;
        this.updated(this);
    }

    async login(otp) {
        if (!this.partialLogin) return false;
        const {success} = await login(this.partialLogin, otp)
        this.partialLogin = null;
        if (success) {
            await this.upd();
            return true;
        } else {
            this.updated(this);
            return false;
        }
    }

    async logoff() {
        await logoff();
        await this.upd();
    }

    async logoff_all() {
        await logoff_all();
        await this.upd();
    }

    async upd() {
        const {capabilities, user} = await check_user();
        this.capabilities = new Set(capabilities);
        this.user = user;
        this.updated(this);
    }
}

function loginStore() {
    const login = new Login();
    const { subscribe, set } = writable(login);
    login.updated = set;
    login.upd();
    return {
        subscribe
    }
}

export default loginStore()