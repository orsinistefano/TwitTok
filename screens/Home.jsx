import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import CommunicationController from '../model/CommunicationController';
import TwokLoaderHelper from '../viewmodel/TwokLoaderHelper';
import DisplayTwoks from '../components/DisplayTwoks';

export default function Home(props) {
 


    return (<View>
 
      <DisplayTwoks uid="0" props={props} header="none"> </DisplayTwoks>

    </View>);
}
