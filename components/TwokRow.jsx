import React, { Component, useContext } from 'react';
import { StyleSheet, Image, Text, View, Dimensions, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import CommunicationController from '../model/CommunicationController';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Database from '../model/StorageManager';
import { SidContext } from '../UseContext/SidContext';
function TwokRow(props) {
    const navigation = useNavigation();
    var twok = props.data.item;

    const [bg, setBg] = useState(twok.bgcol);
    const [fontColor, setFontColor] = useState(twok.fontcol);
    const [Size, SetFontSize] = useState(15);
    const [FontType, SetFontType] = useState('System');
    const [Horizontal, SetHorizontal] = useState('center');
    const [Vertical, SetVertical] = useState('center');
    //{"bgcol": "ffde17", "fontcol": "ed1c24", "fontsize": 2, "fonttype": 2, "halign": 1, "lat": null, "lon": null, "name": "unnamed", "pversion": 0, "text": "Ciao", "tid": 152, "uid": 110734, "valign": 2} 
    const [pic, setPic] = useState(null);
    const BASE64_PIC_HEADER = 'data:image/png;base64,';
    const database = new Database();
    const context = useContext(SidContext);
    const [pvers, setPvers] = useState();
//console.log(twok)

    useEffect(() => {
        //I Only run once (When the component gets mounted) 



        switch (twok.fontsize) {

            case 0: SetFontSize(15);
                break;
            case 1: SetFontSize(30);
                break;
            case 2: SetFontSize(45);
                break;


        }

        switch (twok.fonttype) {

            case 0: SetFontType('System')
                break;
            case 1: SetFontType('serif')
                break;
            case 2: SetFontType('monospace')
                break;

        }

        switch (twok.halign) {
            case 0: SetHorizontal('flex-start')
                break;
            case 1: SetHorizontal('center')
                break;
            case 2: SetHorizontal('flex-end')
                break;

        }
        switch (twok.valign) {
            case 0: SetVertical('flex-start')
                break;
            case 1: SetVertical('center')
                break;
            case 2: SetVertical('flex-end')
                break;

        }

    }, []);
    useEffect(() => { displayPic() }, [pic])

    async function displayPic() {
        await database.init();
        var pversionFromDatabase;
        var picFromDatabase;
        var pictureFromServer; 

        // i have to search if twok.pversion == pversion in the database (other data are uid, pic) if yes then 
        //fetch the pic from the database, otherwise 
        // upload to database current pversion and pic with same uid 
        try {
             pversionFromDatabase = await database.getUserPversion(twok.uid, twok.pversion);
           // console.log(pversionFromDatabase, "numero");
            // setPvers(pversionFromDatabase); nooo

           
        } catch (error) {
            Alert.alert('Error ', 'Connection error');
            console.log(error);

        } if (pversionFromDatabase == twok.pversion) {
           try{ picFromDatabase = await database.getUserPicture(twok.uid, twok.pversion);
            //console.log(twok.name, picFromDatabase, "database")
           }catch(error){
            Alert.alert('Error ', 'Connection error');
           }
            setPic(picFromDatabase)
        } else {
            try{
             pictureFromServer = await CommunicationController.getProfilePicture(context.sid, twok.uid);
            }catch(error){
            Alert.alert('Error ', 'Connection error');
            }
            //console.log(pictureFromServer.picture, "server");
            await database.insertUser(twok.uid, twok.pversion, pictureFromServer.picture)
            setPic(pictureFromServer); 
        }
        
    }






    return (




        <View style={{ backgroundColor: '#' + bg, ...styles.twokStyle }}>

            <View style={{ flex: 1, ...styles.picture }} >

                <Pressable disabled={props.header === "mine" ? true : false} onPress={() => { navigation.navigate('SpecificFeed', { "user": twok.uid, "pversion": twok.pversion, "username": twok.name, "uid": twok.uid }) }}>
                    <Image source={pic != null ? { uri: BASE64_PIC_HEADER + pic } : require('../res/user.png')} style={{ width: 100, height: 50, resizeMode: 'contain' }} />

                    <Text>{twok.name}</Text>
                </Pressable>
            </View>

            {twok.lat && twok.lon && <TouchableOpacity onPress={() => { navigation.navigate('Map', { "latitude": twok.lat, "longitude": twok.lon }) }}><Text>mappa</Text></TouchableOpacity>}
            <View style={{ flex: 5, alignItems: Horizontal, justifyContent: Vertical }} >
                <Text style={{ color: '#' + fontColor, fontSize: Size, fontFamily: FontType, ...styles.textStyle }}>{twok.text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    twokStyle: {
        width: "100%",

        height: Dimensions.get('window').height,

    },
    textStyle: {
        paddingBottom: 140
    },
    picture: {
        paddingTop: 30,
    }
});

export default TwokRow;