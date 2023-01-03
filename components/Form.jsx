import { StyleSheet, View, TextInput, Text, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import { useState, useRef, useContext } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../firebase-config';
import firebase from 'firebase/compat/app';
import { UserContext } from '../contexts/userContext';


export function Form({ navigation }) {

    // get from context name and phone
    const { name, setName, phone, setPhone, role, setRole } = useContext(UserContext);

    const [verificationId, setVerificationId] = useState('');
    const recaptchaVerifier = useRef(null);

    const sendVerification = async () => {
        if (phone.length == 10 && name.length > 3 && role != '') {
            try {
                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                const phoneNumber = '+57' + phone;
                const verificationIdTemp = await phoneProvider.verifyPhoneNumber(
                    phoneNumber,
                    recaptchaVerifier.current
                );
                setVerificationId(verificationIdTemp);
                navigation.navigate('ConfirmationCode', { id: verificationIdTemp });
            } catch (err) {
                Alert.alert("Error2", err.message);
            }
        } else {
            Alert.alert('Debe llenar todos los campos');
        }
    };

    const handleNameChange = (e) => {
        setName(e);
    }

    const handlePhoneChange = (e) => {
        setPhone(e);
    }

    const auxiliarTouchProps = {
        onPress: (e) => (setRole('Auxiliar')),
        style: role === 'Auxiliar' ? styles.roleLeftSelected : styles.roleRight,

    }

    const tractoristaTouchProps = {
        onPress: (e) => (setRole('Tractorista')),
        style: role === 'Tractorista' ? styles.roleRightSelected : styles.roleLeft,
    }

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <TextInput style={styles.textInput} placeholder="Nombre" onChangeText={handleNameChange} />
            <TextInput style={styles.textInput} placeholder="Celular" onChangeText={handlePhoneChange} keyboardType="numeric" />

            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableHighlight {...auxiliarTouchProps} >
                    <Text style={role === "Auxiliar" ? { color: "#fff" } : { color: "#000" }}>Auxiliar</Text>
                </TouchableHighlight>
                <TouchableHighlight {...tractoristaTouchProps}>
                    <Text style={role === "Tractorista" ? { color: "#fff" } : { color: "#000" }}>Tractorista</Text>
                </TouchableHighlight>
            </View>
            <TouchableOpacity
                style={styles.registrar}
                onPress={() => sendVerification()}
            >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Registrate</Text>
            </TouchableOpacity>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        paddingHorizontal: 20,
        bottom: 60,
        gap: 10,
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

    roleLeftSelected: {
        backgroundColor: "#0582ca",
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
        backgroundColor: "#0582ca",
        paddingVertical: 14,
        paddingHorizontal: 20,
        width: "50%",
        marginRight: 1,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 5,
        borderColor: "#006494",
        borderWidth: 1,
    }
});

export default Form