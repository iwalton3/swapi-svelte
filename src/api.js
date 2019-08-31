/* 
 * These are all of the swapi endpoints used for login and
 * user management. If you do not wish to use swapi, but
 * would like to use all of the other features of the
 * template, this file is useful to see what the backend
 * needs to implement.
 */

const url = "SERVER_URL_GOES_HERE";
const jsonCT = new Headers();
jsonCT.append('Content-Type', 'application/json');

function jsonRequest(method, args=[], kwargs={}) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: jsonCT,
            credentials: 'include',
            body: JSON.stringify({method,args,kwargs,"version":2})
        }).then(response => {
            if (response.status == 200) {
                response.json().then(res => {
                    if (!res.success) {
                        console.log(res.error + ": " + res.error_message);
                        reject(res.error);
                    } else {
                        resolve(res.result);
                    }
                });
            } else {
                reject(status);
            }                
        }).catch(error => reject(error));
    });
}

// Note: In this API, the 'username' and 'user' are strings that
// refer to the user's email address.

// Logoff current user.
// Returns: [void]
export function logoff() { return jsonRequest('logoff'); }

// Logoff current user from all devices.
// Returns: [void]
export function logoff_all() { return jsonRequest('logoff_all'); }

// Finish the login process by checking the one time password the
// user got by checking their email.
// Input: user [string], otp [string]
// Returns: { success: [bool], token: [string, unused] }
export function login(user, otp) { return jsonRequest('login', [user, otp]); }

// Start the login process by sending an email to 'username'.
// Input: username [string]
// Returns: token [string, unused]
export function send_otp(username) { return jsonRequest('send_otp', [username]); }

// Register 'user' with 'role'.
// Input: username [string], role [string]
// Returns: [void]
export function register_user(username, role) { return jsonRequest('register_user', [username, role]); }

// Set role for 'user' to 'role'.
// Input: username [string], role [string]
// Returns: [void]
export function set_user_role(username, role) { return jsonRequest('set_user_role', [username, role]); }

// List all roles.
// Returns: roles [list[string]]
export function list_roles() { return jsonRequest('list_roles'); }

// Get a list of all users.
// Returns: users [list[{ id: [int], username: [string], role: [string] }]]
export function get_all_users() { return jsonRequest('get_all_users'); }

// Get the status of the current user.
// Returns: { authenticated: [bool], capabilities: list[string], user: [string] }
export function check_user() { return jsonRequest('check_user'); }
