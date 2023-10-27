import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Feed from '../screens/Feed'
import Map from '../screens/Map';
import FollowedList from '../screens/FollowedList';
import ModifyProfile from '../screens/ModifyProfile';
import { useContext } from 'react';
import SidContextProvider from '../UseContext/SidContext';
import { SidContext } from '../UseContext/SidContext';
import { HeaderHeightContext } from 'react-navigation-stack';
const Stack = createStackNavigator()
 export default function FeedStack() {
  
    return (
      <SidContextProvider>
        <Stack.Navigator initialRoutName="Feed"  screenOptions={{
        
           
          }}>
         <Stack.Screen name="Feed" component={Feed} options={{ }}/>
         <Stack.Screen name="Map" component={Map}  />
         <Stack.Screen name="Followed" component={FollowedList}  />
         <Stack.Screen name="Modify" component={ModifyProfile}  />
      </Stack.Navigator>
      </SidContextProvider>
      
      
    )
}