import { createContext } from 'react';
import { useState, useEffect } from 'react';
export const SidContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from '../model/CommunicationController';
import { ActivityIndicator } from 'react-native';

export default function SidContextProvider({ children }) {
    const [sid, setSid] = useState();
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function getSid() {
      //await AsyncStorage.clear()
        try {
          const storedSid = await AsyncStorage.getItem('sid');
          if (storedSid) {
            setSid(storedSid);
          } else {
            const data = await CommunicationController.register()
            setSid(data.sid);
            await AsyncStorage.setItem('sid', data.sid);
          }
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
      getSid();
    }, []);
  
    if(isLoading){
      return <ActivityIndicator />
    }
  
    return (
      <SidContext.Provider value={{ sid }}>
        {children}
      </SidContext.Provider>
    );
  }