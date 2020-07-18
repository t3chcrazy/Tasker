import React,{useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import TaskInput from "./TaskInput";
export default function Header(){
   
    return(
        <View style={styles.header}>
            <Text style={styles.textContainer} > Todo List </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height:50,
        flexDirection:"row",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        backgroundColor:"#0077CC",
        shadowOpacity: 0.35,
        shadowRadius: 46,
        elevation: 8,
        padding:5,
        justifyContent: 'space-between',
        alignContent:'center',
        textAlign:'center'
        
    },
    textContainer:{
        fontSize: 25,
        color:"white"
    },
    buttonContainer:{
        textAlign:'center',

        width:"30%",

    },
    button:{
        textAlign:'center',
        borderWidth:5,
        borderColor:"green",
        width:"40%",
    } 
})
