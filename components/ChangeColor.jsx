import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';


//component to change color
export function ChangeColor(props) {
    return (

        <View style={styles.container2}>


            <Pressable onPress={() => props.Set(props.color1)} style={{
                backgroundColor: props.color1,
                ...styles.button
            }}>
            </Pressable>
            <Pressable onPress={() => props.Set(props.color2)} style={{
                backgroundColor: props.color2,
                ...styles.button
            }}>
            </Pressable>
            <Pressable onPress={() => props.Set(props.color3)} style={{
                backgroundColor: props.color3,
                ...styles.button
            }}>
            </Pressable>
            <Pressable onPress={() => props.Set(props.color4)} style={{
                backgroundColor: props.color4,
                ...styles.button
            }}>
            </Pressable>
            <Pressable onPress={() => props.Set(props.color5)} style={{
                backgroundColor: props.color5,
                ...styles.button
            }}>
            </Pressable>
        </View>);
}
 const styles = StyleSheet.create({
    
    container2: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        padding: 10,

    },
  
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 25,
        marginHorizontal: 2,
        borderRadius: 10

    },
   




});