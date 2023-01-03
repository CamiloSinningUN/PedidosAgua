import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/Home';

const HomeStack = createNativeStackNavigator();

function Navigator() {
    return (
        <NavigationContainer>
            <HomeStack.Navigator>
                <HomeStack.Screen name="Home" component={Home} options={{
                    headerShown: false
                }} />
            </HomeStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;