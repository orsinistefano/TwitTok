import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import Home from '../screens/Home';
import SpecificFeed from '../screens/SpecificFeed'
import Map from '../screens/Map';
import SidContextProvider from '../UseContext/SidContext';

const Stack = createStackNavigator()


 export default function HomeStack() { 
    return (
      <SidContextProvider>
        <Stack.Navigator initialRoutName="HomeScreen"  screenOptions={{
           
          }}>
         <Stack.Screen name="Homescreen" component={Home} />
         <Stack.Screen name="SpecificFeed" component={SpecificFeed} />
         <Stack.Screen name="Map" component={Map} />
         
      </Stack.Navigator>
      </SidContextProvider>
      
    )
}