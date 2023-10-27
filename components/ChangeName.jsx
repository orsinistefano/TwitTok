import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useContext, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import CommunicationController from "../model/CommunicationController";
import { SidContext } from "../UseContext/SidContext";

export default function ChangeName({updateProfile}) {
    const [username, setUsername] = useState("");
    const context = useContext(SidContext);
    const sendName = async () => {
        // No permissions request is necessary for launching the image library
        try {
            let result = await CommunicationController.setName(context.sid, username);
           // console.log(result);
            Alert.alert('Name Selected', 'Your new username has been set.');
            updateProfile();
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Your selected name could not be set.');
        }

    };
    return (
        <View style={styles.container}>

            <View>

                <View >
                    
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        maxLength={20}>
                    </TextInput>
                </View>
                <TouchableOpacity onPress={sendName} style={{ borderColor: 'black', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10, height: 50, margin: 10, backgroundColor: "#424242" }} >
                    <Text style={{ color: 'white' }}>Submit</Text>

                </TouchableOpacity>
            </View>
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
