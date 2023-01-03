import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../contexts/userContext'

const WaterCansCard = () => {

    const { user } = useContext(UserContext);
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle} >Recoger canecas</Text>
            <Text style={styles.cardBody}>Lote: 113</Text>
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
        marginBottom: 10,
    }

})

export default WaterCansCard