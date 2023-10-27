import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './routes/BottomTab';
import SidContextProvider from './UseContext/SidContext';
import IntroScreen from './screens/IntroScreen';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

export default function App() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    async function getConfig() {
      try {
        const configuration = await AsyncStorage.getItem('config');
        if (configuration) {
          setConfig(configuration);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getConfig();
  }, []);

  return (
    <SidContextProvider>
      <NavigationContainer>
        {config ? (
          <BottomTab />
        ) : (
          <Stack.Navigator  screenOptions={{headerTitle: 'Test', headerShown: false}}>
            <Stack.Screen name="Intro" component={IntroScreen} options={{}} />
            <Stack.Screen name="BottomTab" component={BottomTab} options={{headerShown: false}} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SidContextProvider>
  );
}