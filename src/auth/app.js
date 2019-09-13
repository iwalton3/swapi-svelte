import UserManager from './UserManager.svelte';
import LogoffAll from './LogoffAll.svelte';
import Login from './Login.svelte';

const app = {
    name: "Auth",
    unlisted: true,
    routes: {
        default: Login,
        logoff_all: LogoffAll,
        admin: {
            name: "Auth Admin",
            require: 'accountmanager',
            icon: 'recent_actors',
            routes: {
                default: UserManager
            }
        }
    }
}

export default app
