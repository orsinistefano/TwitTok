import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import NewTwok from '../screens/NewTwok';
import FeedStack from '../routes/FeedStack';
import { View } from 'react-native';
import HomeStack from './HomeStack';
import Ionicons from 'react-native-vector-icons/Ionicons';



const Tab = createBottomTabNavigator();
const homeName = "Home";
const createName = "create";
const settingsName = "profile";


export default function BottomTab() {

    return (
        
        <Tab.Navigator
            headerMode= "screen"
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline';

                    } else if (rn === createName) {
                        iconName = focused ? 'add' : 'add-outline';

                    } else if (rn === settingsName) {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color='black' />;
                },

                
                tabBarActiveTintColor: 'blue',
                inactiveTintColor: 'black',
                headerStyle: {
                    height: 70
                }

            })}>

            <Tab.Screen name="Home" component={HomeStack} options={{headerShown: false}} />
            <Tab.Screen name="create" component={NewTwok} />
            <Tab.Screen name="profile" component={FeedStack}  options={{headerShown: false}} />
        </Tab.Navigator>

    );
}
