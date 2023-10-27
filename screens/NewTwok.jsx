
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, TouchableOpacity, SafeAreaView, Dimensions, FlatList, Alert } from 'react-native';
import CommunicationController from '../model/CommunicationController';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import { faTextHeight } from '@fortawesome/free-solid-svg-icons';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import { faDownLong } from '@fortawesome/free-solid-svg-icons';
import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import Icon from '@mdi/react';
import { mdiFormatVerticalAlignBottom } from '@mdi/js';
import NewTwokFormatter from '../viewmodel/NewTwokFormatter';
import { ChangeColor } from '../components/ChangeColor';
import { SidContext } from '../UseContext/SidContext';
import { useContext } from 'react';
import * as Location from 'expo-location';
function NewTwok({ navigation }) {
    const [textInputValue, setTextInputValue] = useState('twok');
    const [bg, SetBg] = useState('#c06c84');
    const [fontColor, SetFontColor] = useState('#fce4ec');
    const [Size, SetFontSize] = useState(15);
    const [positionH, SetPositionH] = useState('center');
    const [positionW, SetPositionW] = useState('center');
    const [FontType, SetFontType] = useState('normal');

    const [lon, setLon] = useState(null);
    const [lat, setLat] = useState(null);
    const context = useContext(SidContext);



    const send = () => {
      //  console.log(Size)
        NewTwokFormatter.Sender(context.sid, textInputValue, bg, fontColor, Size, FontType, positionH, positionW, lat, lon)
            .then(result => {
                console.log(result);
                Alert.alert('Twok uploaded', 'Your twok has been uploaded.');
            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                Alert.alert('⚠Twok not uploaded', 'Your twok has not been uploaded.');
                throw error;
            });



        // CommunicationController.AddTwok(textInputValue, bg, fontColor, Size, FontType, positionH, positionW )

    }
    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            setLat(location.coords.latitude);
            console.log(location)
            setLon(location.coords.longitude);
            console.log(lat)

        })();
    }, []);


    //render
    return (
        //main container

        <View style={styles.container}>

            <View style={{
                backgroundColor: bg,
                alignItems: positionH,
                justifyContent: positionW,

                ...styles.twok
            }}>
                <Text style={{
                    color: fontColor,
                    fontSize: Size,
                    fontFamily: FontType,
                    margin: 5
                }}>
                    {textInputValue}
                </Text>
            </View>
            < View>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setTextInputValue(text)}
                    value={textInputValue}
                    maxLength={100}
                    placeholder="Insert your text!"
                />
            </View>
            {/* twok color area */}
            <Text style={styles.label}>Set background color: </Text>
            <ChangeColor Set={SetBg} color1='#c06c84' color2='#2E7D32' color3='#01579B' color4='#512DA8' color5='#fa5788' />

            <Text style={styles.label}>Set fontColor: </Text>
            <ChangeColor Set={SetFontColor} color1='#fce4ec' color2='#B71C1C' color3='#D81B60' color4='#EF6C00' />


            {/* font size area*/}
            <Text style={styles.label}>font size:</Text>
            <View style={styles.container2}>
                <Pressable onPress={() => SetFontSize(15)}
                    style={styles.button}>
                    <FontAwesomeIcon icon={faTextHeight} size={20} />
                </Pressable>
                <Pressable onPress={() => SetFontSize(30)}
                    style={styles.button}>
                    <FontAwesomeIcon icon={faTextHeight} size={25} />
                </Pressable>
                <Pressable onPress={() => SetFontSize(45)}
                    style={styles.button}>
                    <FontAwesomeIcon icon={faTextHeight} size={30} />
                </Pressable>
            </View>


            <Text style={styles.label}>text position:  horizontal</Text>
            
            <View style={styles.container2}>

                <Pressable onPress={() => SetPositionH('flex-start')} style={
                    styles.button
                }>
                    <FontAwesomeIcon icon={faAlignLeft} size={20} />
                </Pressable>
                <Pressable onPress={() => SetPositionH('center')} style={

                    styles.button
                }>
                    <FontAwesomeIcon icon={faAlignCenter} size={20} />
                </Pressable>
                <Pressable onPress={() => SetPositionH('flex-end')} style={
                    styles.button
                }>
                    <FontAwesomeIcon icon={faAlignRight} size={20} />
                </Pressable>


            </View>
            <Text style={styles.label}>text position: vertical</Text>
            <View style={styles.container2}>

           
            
            

                <Pressable onPress={() => SetPositionW('flex-start')} style={
                    styles.button
                }>
                    <FontAwesomeIcon icon={faUpLong} size={20} />
                </Pressable>
                <Pressable onPress={() => SetPositionW('center')} style={

                    styles.button
                }>
                    <FontAwesomeIcon icon={faArrowsLeftRight} size={20} />
                </Pressable>
                <Pressable onPress={() => SetPositionW('flex-end')} style={
                    styles.button
                }>
                    <FontAwesomeIcon icon={faDownLong} size={20} />
                </Pressable>

            </View>
            <Text style={styles.label}>Change font</Text>
            <View style={styles.container2}>
                <Pressable onPress={() => SetFontType('normal')}
                    style={{ ...styles.button }}>
                    <Text style={{ fontFamily: 'normal', fontSize: 18 }}>Aa</Text>
                </Pressable>

                <Pressable onPress={() => SetFontType('monospace')}
                    style={{ ...styles.button }}>
                    <Text style={{ fontFamily: 'monospace', fontSize: 18 }}>Aa</Text>
                </Pressable>
                <Pressable onPress={() => SetFontType('serif')}
                    style={{ ...styles.button }}>
                    <Text style={{ fontFamily: 'serif', fontSize: 18 }}>Aa</Text>
                </Pressable>

            </View>
            <View style={{flex: 1, justifyContent: "flex-end"}}>
            <TouchableOpacity style={{ borderColor: 'black', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10, height: 50, margin: 10, backgroundColor: bg }} onPress={send}>
                <Text style={{ color: fontColor }}>Send twok</Text>

            </TouchableOpacity>
            </View>


        </View>
    );
}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 5,
        marginVertical: 5,

    },
    container2: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        padding: 10,
        marginLeft: 10,

    },
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
    twok: {
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        margin: 10
    },
    label: {
        marginLeft: 10,
    }




});




export default NewTwok;