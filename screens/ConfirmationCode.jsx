import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import firebase from 'firebase/compat/app';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmationCode = ({ route, navigation }) => {

    const { name, phone, role, user, setUser } = useContext(UserContext);

    const [code, setCode] = useState('');

    const id = route.params.id;

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(id, code);
        firebase.auth().signInWithCredential(credential)
            .then((result) => {
                // create user in firestore
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                    .set({
                        Nombre: name,
                        Telefono: phone,
                        Role: role,
                        loggedIn: true,
                    })
                    .then(() => {
                        // save user data in async storage
                        AsyncStorage.setItem('user', JSON.stringify(result.user));
                        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    })
                    .then(() => {
                        setUser({
                            Nombre: name,
                            Telefono: phone,
                            Role: role,
                            loggedIn: true,
                            uid: firebase.auth().currentUser.uid,
                        });
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                    })
                    .catch((error) => {
                        Alert.alert(error.message);
                    })
            })
            .catch((error) => {
                Alert.alert('Error, código incorrecto');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ingresa el código enviado</Text>
            <TextInput style={styles.textInput} keyboardType='numeric' onChangeText={(e) => (setCode(e))} />
            <View style={styles.horizontalContainer}>
                <Text>¿No recibiste el código?</Text>
                <TouchableOpacity style={styles.TouchableOpacity}>
                    <Text style={styles.link}>Reenviar</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={confirmCode}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 70,
    },

    TouchableOpacity: {
        marginLeft: 5,
    },

    button: {
        backgroundColor: '#006494',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    link: {
        color: '#006494',
        textDecorationLine: 'underline',
    },

    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textInput: {
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderColor: "#006494",
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 25,
        textAlign: 'center',
    },
})


export default ConfirmationCode