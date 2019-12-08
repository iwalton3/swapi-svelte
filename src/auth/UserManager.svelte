<script>
    import { get_all_users, list_roles, register_user, set_user_role } from '../api.js';
    import Page from '../router/Page.svelte';
    import SelectBox from '../components/SelectBox.svelte';
    import LazySelectBox from '../components/LazySelectBox.svelte';
    import notify from '../router/notify.js';
    
    import DataTable, {Head, Body, Row, Cell} from '@smui/data-table';
    import Textfield from '@smui/textfield';
    import Button, {Label} from '@smui/button';

    let users = [];
    let roles = [];
    
    let userToAdd = "";
    let userToAddRole = null;

    list_roles().then(result => {roles = result; });

    async function updateUserList() {
        users = await get_all_users();
    }

    async function addUser() {
        if (!userToAdd) return false;
        try {
            await register_user(userToAdd, userToAddRole);
            notify(`Added user "${userToAdd}".`);
        } catch (_) {
            notify("User registration failed.", "error");
        }
        await updateUserList();
    }

    async function updUser(user) {
        if (!user) return false;
        try {
            await set_user_role(user.username, user.role);
            notify(`User "${user.username}" is now ${user.role}.`);
        } catch (_) {
            notify("User update failed.", "error");
        }
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
        <DataTable table$aria-label="Users">
        <Head>
            <Row>
                <Cell>User</Cell>
                <Cell>Role</Cell>
            </Row>
        </Head>
        <Body>
            {#each users as user (user.id)}
                <Row>
                    <Cell>{user.username}</Cell>
                    <Cell><LazySelectBox bind:value={user.role} on:change={() => updUser(user)} options={roles}/></Cell>
                </Row>
            {/each}
        </Body>
        </DataTable>
    </div>
    <div class="section pad-after">
        <h3>Add User</h3>
        <form on:submit|preventDefault={addUser}>
            <div class="row-small">
                <Textfield class="input-fw" type="email" bind:value={userToAdd} label="User" />
                <SelectBox name="Role" bind:value={userToAddRole} options={roles}/>
            </div>
            <div class="row-small clearfix">
                <div class="align-right">
                    <Button variant="unelevated" disabled={!userToAddRole}><Label>Add</Label></Button>
                </div>
            </div>
        </form>
    </div>
</Page>
