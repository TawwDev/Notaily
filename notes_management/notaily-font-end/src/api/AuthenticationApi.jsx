import { API_URL } from "../util/constant";
import axios from "axios";

export const apiAuth = (() => {

    //register
    const signUp = async (username, password, email, firstName, lastName) => {
        const response = await axios.post(
            API_URL + "/auth/sign-up",
            {
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName
            }
        );
        return response.data;
    }

    const logIn = async (usernameOrEmail, password) => {
        try {
            const reponse = await axios.post(
                API_URL + "/auth/log-in",
                {
                    username: usernameOrEmail,
                    password: password
                },
                { withCredentials: true }
            );
            return reponse.data;
        } catch (error) {
            console.log(error);
        }
    }

    const logOut = async () => {
        try {
            const reponse = await axios.post(
                API_URL + "/auth/log-out",
                {},
                { withCredentials: true }
            );

            return reponse.data;
        } catch (error) {
            alert(error);
        }
    }

    const introspect = async (token) => {
        try {
            const reponse = await axios.post(
                API_URL + "/auth/introspect",
                { token: token },
                { withCredentials: true }
            );

            return reponse.data;
        } catch (error) {
            alert(error);
        }
    }

    return {
        logIn,
        logOut,
        signUp,
        introspect
    };

})();