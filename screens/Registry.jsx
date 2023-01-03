import { StyleSheet, View } from 'react-native'

import { StatusBar } from 'expo-status-bar';
import Logo from '../components/Logo'
import Form from '../components/Form'

export function Registry({ navigation }) {
    return (
        <View style={styles.container}>
            <Logo />
            <Form navigation={navigation} />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});

export default Registry