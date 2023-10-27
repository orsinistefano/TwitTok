import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModifyProfile from './ModifyProfile';
import { ChangeColor } from '../components/ChangeColor';
import ChangeName from '../components/ChangeName';
import ChangePic from '../components/ChangePic';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function SpecificFeed({ route }) {
    const navigation = useNavigation();
    async function config() {
        try {
            await AsyncStorage.setItem('config', 'true');
            navigation.replace('BottomTab');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column', }}>
            <View>
                <Text style={styles.title}>Join </Text>
                <Text style={styles.title}>Twok Community Ⓣ</Text>
                <Text style={{ fontSize: 20 }}>Select a username</Text>
                <ChangeName></ChangeName>
                <Text style={{ fontSize: 20 }}>Choose a profile picture</Text>
                <ChangePic></ChangePic>
            </View>
            <View style={[styles.bottomPart, { flex: 1 }]}>
                <TouchableOpacity onPress={config} style={{ borderColor: 'black', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10, height: 50, margin: 10, backgroundColor: "#0275d8" }} >
                    <Text style={{ color: 'white' }}>continue</Text>
                </TouchableOpacity>
            </View>
        </View>

    );

}
export const styles = StyleSheet.create({

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 25,
        marginHorizontal: 2,
        borderRadius: 10

    },
    title: {
        fontSize: 40,
        color: "#0275d8",

    },
    bottomPart: {

        justifyContent: "flex-end"

    }





});
