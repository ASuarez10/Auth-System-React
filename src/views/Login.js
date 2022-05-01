import React from 'react';
import 'firebaseui/dist/firebaseui.css';
import Firebase from '../server/firebase';


class Login extends React.Component{

    state = {
        authenticated : false,
        user : "",
        firebase : null
    }

    componentDidMount(){
        const firebase = new Firebase();

        firebase.auth.onAuthStateChanged(authUser => {

            authUser
            ? this.setState({
                authenticated : true,
                user : firebase.auth.currentUser.email,
                firebase : firebase
            })
            :firebase.firebaseui.start("#firebaseui-auth-container",{
                signInSuccessUrl : "/",
                credentialHelper : "none",
                callbacks : {
                    signInSuccessWithAuthResult : (authResult, redirectUrl) => {

                        this.setState({
                            authenticated : true,
                            user : firebase.auth.currentUser.email,
                            firebase : firebase
                        })

                        return false;

                    }
                },

                signInOptions:[
                    {
                        provider : firebase.autorization.EmailAuthProvider.PROVIDER_ID
                    }
                ]

            })

        })
    }

}