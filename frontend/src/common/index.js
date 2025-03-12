const backendDomain = 'http://localhost:8000';
const summaryAPI = {
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
}

export default summaryAPI;
