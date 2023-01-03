import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native'
import Registry from '../screens/Registry';
import Home from '../screens/Home';
import ConfirmationCode from "../screens/ConfirmationCode";

const NewUserStack = createNativeStackNavigator();

function NewUserNavigator() {
    return (
        <NavigationContainer>
            <NewUserStack.Navigator>
                <NewUserStack.Screen name="Registry" component={Registry} options={{
                    headerShown: false
                }} />

                <NewUserStack.Screen name="ConfirmationCode" component={ConfirmationCode} options={
                    {
                        headerTitle: "Confirmacion",
                    }
                } />

                <NewUserStack.Screen name="Home" component={Home} options={{
                    headerShown: false,
                }} />
            </NewUserStack.Navigator>
        </NavigationContainer>
    )
}

export default NewUserNavigator;