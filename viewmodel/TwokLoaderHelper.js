import CommunicationController from '../model/CommunicationController';

export default class TwokLoaderHelper {
    static async downloadMultipleTwoks(sid,uid) {
       
        let result = []
          try{newTwok = await CommunicationController.getTwok(sid, uid)
          result.push(newTwok)
          }catch(error){
            
            console.log(error); 
            return error; 
          }
        return result
    }
    static async downloadTestTwoks(sid,tid) {
    
      console.log(sid, tid); 
      let result = []
    
        
        try{newTwok = await CommunicationController.getTestTwok(sid,tid)
        result.push(newTwok)
        }catch(error){
          console.log(error); 
          return error; 
        }
        
      return result
  }
}