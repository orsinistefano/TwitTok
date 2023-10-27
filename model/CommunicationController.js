export default class CommunicationController {
    static BASE_URL = "https://develop.ewlab.di.unimi.it/mc/twittok/"
    
   

    static async genericRequest(endpoint, parameters) {
        console.log("sending request to: " + endpoint);
        const url = this.BASE_URL + endpoint;
        let httpResponse = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameters)
        });

        const status = httpResponse.status;
        if (status == 200) {
            let deserializedObject = await httpResponse.json();
            return deserializedObject;
        }
        else {
            let error = new Error("Error message from the server. HTTP status: " + status);
            throw error;
        }
    }
    static async register() {
        const parameters = {};
        return await CommunicationController.genericRequest("register", parameters)
    }
    
    static async getTwok(sid, uid) {
        const parameters = { sid: sid , uid: uid};
        return await CommunicationController.genericRequest("getTwok", parameters)
    }
    static async getTestTwok(sid, tid) {
        const parameters = { sid: sid , tid: tid};
        return await CommunicationController.genericRequest("getTwok", parameters)
    }

    static async getProfile(sid) {
        const parameters = {sid:sid};
        return await CommunicationController.genericRequest("getProfile", parameters)
    }
    
    static async setPicture(sid, picture) {
        const parameters = { sid:sid, picture: picture};
        return await CommunicationController.genericRequest("setProfile", parameters)
    }
    static async setName(sid, name) {
        const parameters = { sid:sid, name: name};
        return await CommunicationController.genericRequest("setProfile", parameters)
    }

    static async getProfilePicture(sid, uid) {
        console.log("fetching pic for " + uid)
        const parameters = { sid:sid , uid: uid };
        return await CommunicationController.genericRequest("getPicture", parameters)
    }
    static async AddTwok(sid, text, bgcol, fontcol, fontsize, fonttype, halign, valign, lat, lon) {
        
        console.log("new twok " + text)
        const parameters = { sid: sid,  text: text, bgcol: bgcol, fontcol: fontcol, fontsize: +fontsize, fonttype: +fonttype, halign: +halign, valign: +valign, lat: lat, lon: lon};
       

        return await CommunicationController.genericRequest("addTwok", parameters)
    }
    static async follow(sid, uid) {
        const parameters = { sid:sid , uid: uid };
      
        return await CommunicationController.genericRequest("follow", parameters)
    }
   
    static async unfollow(sid, uid) {
        const parameters = { sid:sid , uid: uid };
      
        return await CommunicationController.genericRequest("unfollow", parameters)
    }
    static async getFollowed(sid){
        const parameters = { sid:sid };
      
        return await CommunicationController.genericRequest("getFollowed", parameters)
    }
    static async isFollowed(sid, uid){
        const parameters = { sid:sid , uid: uid };
      
        return await CommunicationController.genericRequest("isFollowed", parameters)
    }
}