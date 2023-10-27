import CommunicationController from '../model/CommunicationController';

export default class FollowerHelper {
    static async downloadFollowers(sid) {
       var newFollowed; 
        try{
          newFollowed = await CommunicationController.getFollowed(sid); 
        }catch(error){
            console.log(error); 
        }
        return newFollowed; 
    }
}