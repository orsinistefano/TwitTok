import * as SQLite from 'expo-sqlite';

class Database {
    constructor() {
        this.db = SQLite.openDatabase('database9.db'); //mydatabase1.db

    }

    async init() {
        // Create table query
        const query = `
            CREATE TABLE IF NOT EXISTS pics  (
                uid TEXT,
                pversion INTEGER,
                picture TEXT
            )
        `;
        // Execute query
        await this.executeQuery(query);
    }
    async insertUser(uid, pversion, picture) {
      const query = "INSERT INTO pics (uid, pversion, picture) VALUES (?,?,?)";
      await this.executeQuery(query, [uid, pversion, picture]);
      }
      async getUserPversion(uid){
        const query = "SELECT pversion FROM pics WHERE uid = (?)"
        return await this.executeQuery(query, [uid]).then(result => {
          //  console.log("getUserPvers", result)
            if (result.rows.length > 0){
            return result.rows.item(0).pversion;
         }else{ return -1;}
        });
      }
      async getUserPicture(uid, pversion){
        const query = "SELECT picture FROM pics WHERE uid = (?)  AND pversion = (?)"
        return await this.executeQuery(query, [uid, pversion]).then(result => {
          //  console.log("getUserPicture", result)
            if (result.rows.length > 0){
            return result.rows.item(0).picture;
            }else{ return -1;}
        });
      } 
    async executeQuery(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(query, params, (_, result) => resolve(result), (_, error) => reject(error));
            });
        });
    }
}


export default Database;
