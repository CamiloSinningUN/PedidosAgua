import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/userContext';
import firebase from 'firebase/compat/app';

const Settings = ({ navigation }) => {

    const { user, setUser, name, setName, role, setRole, phone, setPhone } = useContext(UserContext);

    useEffect(() => {
        setName(user.Nombre);
        setPhone(user.Telefono);
        setRole(user.Role);
    }, []);



    const HandleOnPress = () => {

        if (name.length > 3 && phone.length == 10 && role != '') {
            firebase.firestore().collection('users').doc(user.uid)

                .update({
                    Nombre: name,
                    Telefono: phone,
                    Role: role,
                })
                .then(() => {
                    Alert.alert('Datos actualizados');
                    const updatedUser = {
                        Nombre: name,
                        Telefono: phone,
                        Role: role,
                        loggedIn: true,
                        uid: user.uid,
                    }
                    setUser(updatedUser);
                }
                )
                .catch((error) => {
                    Alert.alert(error.message);
                });
        }
        else {
            Alert.alert('Datos incompletos');
        }
    }

    const handleNameChange = (e) => {
        setName(e);
    }

    const handlePhoneChange = (e) => {
        setPhone(e);
    }

    const auxiliarTouchProps = {
        onPress: (e) => (setRole('Auxiliar')),
        style: (role === 'Auxiliar' || (role === "" && user.Role === "Auxiliar")) ? styles.roleRightSelected : styles.roleRight,

    }

    const tractoristaTouchProps = {
        onPress: (e) => (setRole('Tractorista')),
        style: (role === 'Tractorista' || (role === "" && user.Role === "Tractorista")) ? styles.roleLeftSelected : styles.roleLeft,
    }


    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder="Nombre" value={name} onChangeText={handleNameChange} />
            <TextInput style={styles.textInput} placeholder="Celular" value={phone} onChangeText={handlePhoneChange} />

            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity {...auxiliarTouchProps}>
                    <Text style={role === "Auxiliar" ? { color: "#fff" } : { color: "#000" }}>Auxiliar</Text>
                </TouchableOpacity>
                <TouchableOpacity {...tractoristaTouchProps}>
                    <Text style={role === "Tractorista" ? { color: "#fff" } : { color: "#000" }}>Tractorista</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.registrar}
                onPress={() => HandleOnPress()}
            >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Guardar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        paddingHorizontal: 20,
        gap: 10,
        marginTop: 20,
    },

    registrar: {
        backgroundColor: "#006494",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    roleRight: {
        backgroundColor: "#fff",
        paddingVertical: 14,
        paddingHorizontal: 20,
        width: "50%",
        marginRight: 1,
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 5,
        borderColor: "#006494",
        borderWidth: 1,
    },

    roleRightSelected: {
        backgroundColor: "#006494",
        paddingVertical: 14,
        paddingHorizontal: 20,
        width: "50%",
        marginRight: 1,
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 5,
        borderColor: "#006494",
        borderWidth: 1,
    },

    buttonTextSelected: {
        color: "#fff"
    },

    roleLeft: {
        backgroundColor: "#fff",
        paddingVertical: 14,
        paddingHorizontal: 20,
        width: "50%",
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 5,
        borderColor: "#006494",
        borderWidth: 1,
    },

    roleLeftSelected: {
        backgroundColor: "#006494",
        paddingVertical: 14,
        paddingHorizontal: 20,
        width: "50%",
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 5,
        borderColor: "#006494",
        borderWidth: 1,
    },


    textInput: {
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderColor: "#006494",
        borderWidth: 1,

    },
});

export default Settings