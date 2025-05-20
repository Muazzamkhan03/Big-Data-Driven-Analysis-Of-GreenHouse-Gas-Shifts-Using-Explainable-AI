import Cookies from 'js-cookie';

const isLoggedIn = () => {
    try {
        const auth = JSON.parse(localStorage.getItem('auth'));

        if (!auth || !auth.isLoggedIn ) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getUserInfo = () => {
    try {
        let response = {
            name: "",
            email: ""
        }

        if(!isLoggedIn()){
            return response;
        }

        const auth = JSON.parse(localStorage.getItem('auth'));
        response = {
            name: auth.name,
            email: auth.email
        };

        return response;

    } catch (error) {
        let message = error.message;
        
        if(error.response){
            message = error.response.data.error;
        }
        throw new Error(message);
    }
}

export { isLoggedIn, getUserInfo };