import NewUserNavigator from '../routes/newUserStack';
import
HomeNavigator from '../routes/homeStack';
import { UserContext } from '../contexts/userContext';
import { useContext } from 'react';
import firebase from 'firebase/compat/app';

const auth = () => {

    const { user } = useContext(UserContext);

    console.log("usuario 123", user)

    console.log("user", firebase.auth().currentUser);

    return (
        <>
            {!user ? (<NewUserNavigator />) : (<HomeNavigator />)}
        </>
    )
}

export default auth