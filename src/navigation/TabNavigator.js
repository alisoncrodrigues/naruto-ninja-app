
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import Personagens from '../screens/Personagens';
import Favoritos from '../screens/Favoritos';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#101827',
                },

                headerTintColor: '#FFFFFF',

                headerTitleStyle: {
                    fontWeight: 'bold',
                },

                tabBarStyle: {
                    backgroundColor: '#182436',
                    borderTopColor: '#26364B',
                },

                tabBarActiveTintColor: '#FF7A00',
                tabBarInactiveTintColor: '#AAB5C5',
            }}
        >

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Início',
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="Personagens"
                component={Personagens}
                options={{
                    title: 'Personagens',
                }}
            />

            <Tab.Screen
                name="Favoritos"
                component={Favoritos}
                options={{
                    title: 'Favoritos',
                }}
            />

        </Tab.Navigator>
    );
}
