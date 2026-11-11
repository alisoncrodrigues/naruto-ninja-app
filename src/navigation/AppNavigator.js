
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import DetalhesPersonagemScreen from '../screens/DetalhesPersonagem';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Principal"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#101827',
                    },

                    headerTintColor: '#FFFFFF',

                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },

                    contentStyle: {
                        backgroundColor: '#101827',
                    },
                }}
            >

                <Stack.Screen
                    name="Principal"
                    component={TabNavigator}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="DetalhesPersonagem"
                    component={DetalhesPersonagemScreen}
                    options={{
                        title: 'Detalhes do Personagem',
                    }}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
}
