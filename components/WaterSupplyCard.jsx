import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../contexts/userContext'

const WaterSupplyCard = ({ waterSupplyRequest }) => {

    const { user } = useContext(UserContext);

    console.log("agua", waterSupplyRequest)

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle} >Solicitud de agua</Text>
            <Text style={styles.cardBody}>Lote: 113</Text>
            <Text style={styles.cardBody}>No. Canecas: 4</Text>
            <Text style={{ color: "red" }}>Pendiente</Text>
            {user.Role === "Tractorista" ? (<Button title="Hecho" />) : (null)}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },

    cardBody: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 5,
    }

})

export default WaterSupplyCard