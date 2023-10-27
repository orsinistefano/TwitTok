import { useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import FollowerHelper from '../viewmodel/FollowerHelper';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { useEffect } from 'react';
import CommunicationController from '../model/CommunicationController';
import Database from '../model/StorageManager';
import { SidContext } from '../UseContext/SidContext';
export default function MyHeader(props) {
  const BASE64_PIC_HEADER = 'data:image/png;base64,';
  const [uid, setUid] = useState(props.uid);
  const [pic, setPic] = useState();
  const [username, setUsername] = useState(props.username);
  const database = new Database();
  const context = useContext(SidContext); 
 

  const navigation = useNavigation();
  const send = async () => {
    try {
      const result = await FollowerHelper.downloadFollowers(context.sid);

      navigation.navigate('Followed', { result });
    } catch (error) {
      console.error(error);
    }
  }
  const modify = () => {
    navigation.navigate('Modify',{"uid": uid});

  }

  return (
    <View style={{ ...styles.headerContainer, flex: 1 }}>
      <View style={{ flex: 2 }}>
        <Pressable onPress={send}>
          <Text>following </Text>
        </Pressable>
      </View>
      <View style={{ flex: 2 }}>
        <Pressable onPress={modify}>
          <Text>modify your profile</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = {
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    height: 80
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20
  },
  textContainer: {
    flex: 1
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  bioText: {
    fontSize: 14,
    color: '#666'
  }
};

