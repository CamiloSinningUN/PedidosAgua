import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import WaterSupplies from './fragments/WaterSupply';
import WaterCans from './fragments/WaterCans';
import Settings from './fragments/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator()

const Home = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Agua') {
                        iconName = focused
                            ? 'water'
                            : 'water-outline';
                    } else if (route.name === 'Canecas') {
                        iconName = focused ? 'cube' : 'cube-outline';
                    } else if (route.name === 'Yo') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    // put some paddding on the bottom
                    paddingBottom: 10,
                    height: 60,
                    paddingTop: 5
                }
            })}
        >
            <Tab.Screen name={'Agua'} component={WaterSupplies} />
            <Tab.Screen name={'Canecas'} component={WaterCans} />
            <Tab.Screen name={'Yo'} component={Settings} />
        </Tab.Navigator>
    )
}

export default Home