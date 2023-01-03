import { StyleSheet, View, Text } from "react-native"

function Logo() {
    return (
        <View>
            <Text style={styles.logo}>Peticiones de agua</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        color: "#00a6fb",
        fontSize: 50,
        fontWeight: "bold",
        width: 250,
        textAlign: "center",
        marginBottom: 200,
    },
});



export default Logo