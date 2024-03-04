import React from 'react'
import Home from '../screents/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type AppStackParamList = {
    Home: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackTitleVisible: false
            }}
        >
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}
