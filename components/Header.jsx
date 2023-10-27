import { useState, useEffect, useContext } from 'react';
import { View, Image, Text, Alert} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CommunicationController from '../model/CommunicationController';
import Database from '../model/StorageManager';
import { SidContext } from '../UseContext/SidContext';
export default function Header(props) {
  const BASE64_PIC_HEADER = 'data:image/png;base64,';

  //const [pic, setPic] = useState();
  const [username, setUsername] = useState(props.username);
  const [uid, setUid] = useState(props.uid);
  const context = useContext(SidContext);
 
  const database = new Database();
  //add promises and error handling and other stuff omg it is such a mess r here  
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    async function checkFollowed() {
      try {
        const result = await CommunicationController.isFollowed(context.sid, uid);
        setIsFollowing(result.followed);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    checkFollowed();
  }, [uid]);

  return (
    <View style={styles.headerContainer}>

      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{username}</Text>
        {isFollowing ? (
          <Pressable onPress={async () => {
            try {
              await CommunicationController.unfollow(context.sid, uid)
              setIsFollowing(false);
              console.log("ok");
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'an error occured during the unfollow request ');
            }
          }}>
            <Text style={{ color: "red" }}>unfollow</Text>
          </Pressable>
        ) : (
          <Pressable onPress={async () => {
            try {
              await CommunicationController.follow(context.sid, uid)
              setIsFollowing(true);
              console.log("ok");
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'an error occured during the follow request ');
            }
          }}>
            <Text style={{ color: "blue" }}>follow</Text>
          </Pressable>
        )}


      </View>
    </View>
  );
};

const styles = {
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    height: 100
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

