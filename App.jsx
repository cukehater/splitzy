import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Home from './screen/Home'
import AddExpense from './screen/AddExpense'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style='light' />
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        >
          <Stack.Screen
            name='Home'
            component={Home}
            options={{ title: '홈' }}
          />
          <Stack.Screen
            name='AddExpense'
            component={AddExpense}
            options={{ title: '입력' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
