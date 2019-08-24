<script>
    import { get_all_users, list_roles, register_user, set_user_role } from '../api.js';
    import Page from '../router/Page.svelte';
    import SelectBox from '../components/SelectBox.svelte';
    import LazySelectBox from '../components/LazySelectBox.svelte';
    let users = [];
    let roles = [];
    
    let userToAdd = "";
    let userToAddRole = "";

    list_roles().then(result => {roles = result; });

    async function updateUserList() {
        users = await get_all_users();
    }

    async function addUser() {
        if (!userToAdd) return false;
        await register_user(userToAdd, userToAddRole);
        await updateUserList();
    }

    async function updUser(user) {
        if (!user) return false;
        await set_user_role(user.username, user.role);
        await updateUserList();
    }

    updateUserList();
</script>

<Page title="Manage Users">
    <div class="section">
        <p>This page allows you to manage the user roles for this service.</p>
    </div>
    <div class="section">
        <h3>User Listing</h3>
        <table border="1">
        <thead>
            <tr>
                <th>User</th>
                <th>Role</th>
            </tr>
        </thead>
        <tbody>
            {#each users as user (user.id)}
                <tr>
                    <td>{user.username}</td>
                    <td><LazySelectBox bind:value={user.role} on:change={() => updUser(user)} options={roles}/></td>
                </tr>
            {/each}
        </tbody>
        </table>
    </div>
    <div class="section">
        <h3>Add User</h3>
            <form on:submit={addUser}>
            <label>User: <input type="text" bind:value={userToAdd}></label>
            <label>Role: <SelectBox bind:value={userToAddRole} options={roles}/></label>
            <input type="submit" value="Add"/>
        </form>
    </div>
</Page>
