import { Switch } from 'react-native-gesture-handler';
import CommunicationController from '../model/CommunicationController';

export default class NewTwokFormatter {

    static async Sender(sid,  textInputValue, bg, fontColor, Size, FontType, positionH, positionW, lat, lon) {
console.log(Size, "wtf"); 
        switch(Size){
            case 15: 
                Size=0
                break; 
            case 30: 
                Size=1
                break; 
            case 45: 
                Size=2
                break; 
        
        }
        switch(FontType){
            case 'normal': 
                FontType=0;
                break;  
            case 'monospace': 
                FontType=1; 
                break; 
            case 'serif': 
                FontType=2; 
                break; 
            
            
        }
        console.log(positionH); 
        console.log(positionW); 
        switch(positionH){
            case 'flex-start': 
                positionH=0;
                break; 
            case 'center': 
                positionH=1;
                break; 
            case 'flex-end': 
                positionH=2; 
                break; 

        }
        switch(positionW){
            case 'flex-start': 
                positionW=0;
                break; 
            case 'center': 
                positionW=1;
                break; 
            case 'flex-end': 
                positionW=2; 
                break; 

        }
        stringa = bg.replace('#',''); 
        bg=stringa; 
        stringa1 = fontColor.replace('#',''); 
        fontColor= stringa1; 
        
        
        
        try{
            result = await CommunicationController.AddTwok(sid, textInputValue, bg, fontColor, Size, FontType, positionH, positionW, lat, lon); 
        }catch(error){
            console.log(error); 
            
        }
        if (result.status== 400){
            return -1; 
        }

        return result; 
    }
    


}
