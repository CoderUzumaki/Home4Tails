const backendDomain = 'http://localhost:8000';
const summaryAPI = {
    // Auth
    SignUp : {
        url : `${backendDomain}/api/sign-up`,
        method : 'POST',
        description: 'Sign up a new user',
    },
    Login : {
        url : `${backendDomain}/api/sign-in`,
        method : 'POST',
        description: 'Login a user',
    },
    CurrentUser : {
        url : `${backendDomain}/api/user-details`,
        method : 'GET',
        description: 'Get current user details',
    },
    Logout : {
        url : `${backendDomain}/api/logout`,
        method : 'GET',
        description: 'Logout a user',
    },

    // Admin
    AllUsers : {
        url : `${backendDomain}/api/admin/users`,
        method : 'GET',
        description: 'Get all users details',
    },
    EditUser : {
        url : `${backendDomain}/api/admin/user/edit`,
        method : 'PUT',
        description: 'Edit a user',
    },
    RemoveUser : {
        url : `${backendDomain}/api/admin/user/remove`,
        method : 'DELETE',
        description: 'Remove a user',
    },
}

export default summaryAPI;
