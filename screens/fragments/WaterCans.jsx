import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native'
import React, { useState, useContext } from 'react'
import WaterCansCard from '../../components/WaterCansCard'
import { UserContext } from '../../contexts/userContext'

const WaterCans = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { user } = useContext(UserContext);

    return (
        <View style={{ height: "100%" }}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Crear solicitud de recolección de canecas</Text>
                    <TextInput style={styles.textInput} placeholder="Lote" />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <TouchableOpacity
                            style={styles.canceler}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{ fontWeight: "bold" }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.registrar}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>Crear</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
            <WaterCansCard />
            {(user.Role === "Auxiliar" ? (
                <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)} >
                    <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
            ) : (null))}
        </View>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#006494',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    fabIcon: {
        fontSize: 40,
        color: 'white',
    },
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
        width: "40%",
        alignItems: "center",
        justifyContent: "center",
    },

    canceler: {
        backgroundColor: "#fff",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        width: "40%",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#000",
        borderWidth: 1,
        marginRight: 10,
    },

    roleRight: {
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

    buttonText: {
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

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    }
})

export default WaterCans