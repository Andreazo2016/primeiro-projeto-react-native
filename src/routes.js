import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './pages/Main';
import UserScreen from './pages/User';

const Stack = createStackNavigator();

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
            headerTitleAlign:'center',
            headerBackTitleVisible:false,
            headerStyle:{
                backgroundColor:'#7159c1'
            },
            headerTintColor:'#fff'
        }}
        >
            <Stack.Screen name="Usuários" component={MainScreen} />
            <Stack.Screen name="User" component={UserScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Routes