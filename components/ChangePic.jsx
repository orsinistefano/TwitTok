import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useContext, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import CommunicationController from "../model/CommunicationController";
import { SidContext } from "../UseContext/SidContext";


export default function ChangePic({updateProfile}) {
    const [image, setImage] = useState(null);
    const BASE64_PIC_HEADER = 'data:image/png;base64,';
    const context = useContext(SidContext);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.5, allowsEditing: true, });

        if (!result.canceled && (result.assets[0].base64.length < 137000)) {
            setImage(result.assets[0].base64);

        }
    };
    const sendPicture = async () => {
      
        // No permissions request is necessary for launching the image library
        try {
            let result = await CommunicationController.setPicture(context.sid, image);
            console.log(result);
            Alert.alert('Image Selected', 'Your new image has been set.');
            updateProfile();
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Your new image could not be set.');
        }

    };
    return (
        <View>

            <View>

              
                {image == null ? <TouchableOpacity onPress={pickImage} style={{ borderColor: 'black', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10, height: 50, margin: 10, backgroundColor: "#424242" }} >
                    <Text style={{ color: 'white' }}>Select a photo</Text>
                </TouchableOpacity> : null}



            </View>
            {image ? <TouchableOpacity onPress={sendPicture} style={{ borderColor: 'black', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10, height: 50, margin: 10, backgroundColor: "#424242" }} >
                <Text style={{ color: 'white' }}>Use this as profile picture</Text>
            </TouchableOpacity> : null}
        </View>
    );
}
export const styles = StyleSheet.create({

    input: {
        marginTop: 10,
        marginBottom: 10,
        alignContent: 'center',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        margin: 10

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 25,
        marginHorizontal: 2,
        borderRadius: 10

    },





});
