import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useContext, useState, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import CommunicationController from "../model/CommunicationController";
import { SidContext } from "../UseContext/SidContext";
import ChangePic from "../components/ChangePic";
import ChangeName from "../components/ChangeName";
export default function ModifyProfile({ route }) {
const context = useContext(SidContext); 
const [pic, setPic] = useState()
const [name, setName]= useState()
const [refresh, setRefresh] = useState(false); // New state
    useEffect(() => {
        async function downloadPic() {
          try {
            const result = await CommunicationController.getProfilePicture(context.sid, route.params.uid);
            setPic(result.picture);
            setName(result.name); 
          } catch (error) {
            console.error("error", error);

          }
        }
        downloadPic();
      }, [refresh]);

      const updateProfile = () => { // New function to update the profile
        setRefresh(!refresh);
      };

    return (
        <View style={{margin: 10}}>
        

        <Text style={{ fontSize: 30 }}>Modify your profile:</Text>
        <Text style={{ fontSize: 20 }}>Change your profile picture </Text>
        <Image source={pic != null ? { uri: BASE64_PIC_HEADER + pic } : require('../res/user.png')} style={{ width: 100, height: 50, resizeMode: 'contain' }} />
        
        <ChangePic updateProfile={updateProfile}></ChangePic>
        <Text style={{ fontSize: 20  }}>Change your username</Text>
        <Text style={{ fontSize: 17 }}>{name}</Text>
        <ChangeName updateProfile={updateProfile}></ChangeName>
        </View>
    );
}


