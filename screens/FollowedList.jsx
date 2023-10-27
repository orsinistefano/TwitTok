import { View, Text, FlatList, Image, Pressable, Alert } from "react-native";
import { useEffect, useState } from "react";
import CommunicationController from "../model/CommunicationController";
import { useContext } from "react";
import { SidContext } from "../UseContext/SidContext";
import Database from "../model/StorageManager";
export default function FollowedList({ route }) {
 // console.log(route.params.result);
  const [profiles, setProfiles] = useState(route.params.result);
  const context = useContext(SidContext); 
 

  return (
    <View>

      <FlatList data={profiles}
        renderItem={(profile) => { return <ProfileRow data={profile} /> }}
        keyExtractor={(profile, index) => index.toString()}
        snapToAlignment="start"
        decelerationRate="fast"
        onEndReachedThreshold={0}
        stickyHeaderHiddenOnScroll={true}
      />
    </View>
  );
};

function ProfileRow(props) {
  
  const context = useContext(SidContext);
  const BASE64_PIC_HEADER = 'data:image/png;base64,';
  var profile = props.data.item;
  
  const [pic, setPic] = useState()
  const database = new Database();
  const [isFollowing, setIsFollowing] = useState(false);
 // console.log(profile)
  useEffect(() => {
    async function checkFollowed() {
      try {
        const result = await CommunicationController.isFollowed(context.sid, profile.uid);
        setIsFollowing(result.followed);
      } catch (error) {
        console.error("error", error);
      }
    }
    checkFollowed();
  }, [profile.uid]);
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
          var pversionFromDatabase = await database.getUserPversion(profile.uid, profile.pversion);
         // console.log(pversionFromDatabase, "numero");
          // setPvers(pversionFromDatabase); nooo

      } catch (error) {
          console.log(error);
      } if (pversionFromDatabase == profile.pversion) {
        try{
          picFromDatabase = await database.getUserPicture(profile.uid, profile.pversion);
        }catch(error){
          Alert.alert('Error ', 'Connection error');
        }
          //console.log(twok.name, picFromDatabase, "database")
          setPic(picFromDatabase)
      } else {
        try{
           pictureFromServer = await CommunicationController.getProfilePicture(context.sid, profile.uid);
          //console.log(pictureFromServer.picture, "server");
        }catch(error){
          Alert.alert('Error ', 'Connection error');
        }
          await database.insertUser(profile.uid, profile.pversion, pictureFromServer.picture)
          setPic(pictureFromServer); 
      }
      
  }



  return (<View style={{
    marginEnd: 5,
    
    
  }}>
    <Text>{profile.name}</Text>
    <Image source={pic != null ? { uri: BASE64_PIC_HEADER + pic } : require('../res/user.png')} style={{ width: 100, height: 50, resizeMode: 'contain' }} />
    {isFollowing ? (
      <Pressable onPress={async () => {
        try {
          await CommunicationController.unfollow(context.sid, profile.uid)
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
          await CommunicationController.follow(context.sid, profile.uid)
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

  </View>);
}
