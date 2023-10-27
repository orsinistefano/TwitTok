import React, { Component, useState, useEffect, useMemo, useContext } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, ActivityIndicator, FlatList, Alert } from 'react-native';
import CommunicationController from '../model/CommunicationController';
import TwokLoaderHelper from '../viewmodel/TwokLoaderHelper';
import TwokRow from './TwokRow';
import Header from './Header';
import { useIsFocused } from '@react-navigation/native';
import MyHeader from './MyHeader';
import { SidContext } from '../UseContext/SidContext';

export default function DisplayTwoks(props) {
    const [twoks, setTwoks] = useState([]);
    const [uid, setUid] = useState(props.uid);
    const [page, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [pic, setPic] = useState(props.pic);
    const [username, setUsername] = useState(props.username);
    const [header, setHeader] = useState(props.header);
    const isFocused = useIsFocused();
    const [pversion, setPversion] = useState();
    
    const context = useContext(SidContext); 
    const [tid, setTid]= useState(-1); 
    const [headerVisible, setHeaderVisible] = useState(true);
    useEffect(() => {
        setPversion(props.pversion)
        if (!isFocused) {
            setTwoks([])
        }
        if (uid == "0" && tid===-1) {
            isFocused && downloadTwoks()
        }else if(uid!="0" && tid===-1){
            isFocused && downloadSpecificTwoks();
        }
         else{
            downloadTestTwoks()
        }
    }, [isFocused, page]);
    
    
async function downloadSpecificTwoks() {
    setIsLoading(true);
    try {
        const result = await TwokLoaderHelper.downloadMultipleTwoks(context.sid, uid);
        setTwoks([...twoks, ...result]);
        
    } catch (error) {
        Alert.alert('Upload your twoks', 'you do no have twoks yet');
    } finally {
        setIsLoading(false);
    }
}
    async function downloadTwoks() {
        setIsLoading(true);
        try {
            const result = await TwokLoaderHelper.downloadMultipleTwoks(context.sid);
            setTwoks([...twoks, ...result]);
        } catch (error) {
            Alert.alert('Error ', 'Error while downloading the twoks');
        } finally {
            setIsLoading(false);
        }
    }
    async function downloadTestTwoks() {
        setIsLoading(true);
        try {
            const result = await TwokLoaderHelper.downloadTestTwoks(context.sid, tid);
            setTwoks([...twoks, ...result]);
        } catch (error) {
            Alert.alert('Error ', 'Error while downloading the test twoks');
        } finally {
            setTid(tid+1); 
            setIsLoading(false);
        }
    }
    


    const loadMoreItem = () => {
        setCurrentPage(page + 1);
    };
    const renderLoader = () => {
        return (
            isLoading ?
                <View style={styles.loaderStyle}>
                    <ActivityIndicator size="large" color="#aaa" />
                </View> : null
        );
    };
    const HeaderComponent = () => {
        switch (header) {
            case "specific":
                return <Header pversion={pversion} username={username} uid={uid} ></Header>;
            case "mine":
                return <MyHeader pversion={pversion} username={username} uid={uid} />;
        }
    }
    const onScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        if (scrollY > 100) {
            setHeaderVisible(false);
        } else {
            setHeaderVisible(true);
        }
    };
    return (<View>
    <FlatList
         data={twoks}
            renderItem={(twok) => { return <TwokRow data={twok} uid={uid} header={header} /> }}
            keyExtractor={(twok, index) => index.toString()}
            snapToInterval={Dimensions.get('window').height}
            snapToAlignment="start"
            decelerationRate="fast"
            onScroll={onScroll}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={2}
            ListFooterComponent={renderLoader}
            ListHeaderComponent={
                headerVisible && HeaderComponent
            }

        />


    </View>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,


        //paddingTop: Platform.OS === 'android' ? 20 : 0
    },
    loaderStyle: {
        marginVertical: 16,
        alignItems: "center",
    },

});

