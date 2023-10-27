import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import CommunicationController from '../model/CommunicationController';
import TwokLoaderHelper from '../viewmodel/TwokLoaderHelper';
import DisplayTwoks from '../components/DisplayTwoks';
import MyHeader from '../components/MyHeader';
import { useContext} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { SidContext } from '../UseContext/SidContext';

export default function Feed() {
    const [uid, setUid]= useState(); 
    const [name, setName]= useState(); 
    const [pversion, setPversion]= useState();
    const context = useContext(SidContext);
   
   
    const isFocused = useIsFocused();
    //console.log(isFocused); 
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await CommunicationController.getProfile(context.sid);
               
                setName(result.name);
                setUid(result.uid); 
                setPversion(result.pversion); 
               
            } catch (error) {
                console.error("error",error);
            }
        }
        isFocused && fetchData();
    }, [isFocused]);

    return (
      
        <View>
            {uid &&  <DisplayTwoks uid={uid} pversion={pversion} header="mine" username={name} />}
        </View>
    );
}