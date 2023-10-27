import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import CommunicationController from '../model/CommunicationController';
import TwokLoaderHelper from '../viewmodel/TwokLoaderHelper';
import DisplayTwoks from '../components/DisplayTwoks';

import Header from '../components/Header';

export default function SpecificFeed({route}) {

  return (
    <View>
       <DisplayTwoks uid={route.params.user} header="specific" pversion={route.params.pversion} username={route.params.username} > </DisplayTwoks>
    </View>
  );
  
}

