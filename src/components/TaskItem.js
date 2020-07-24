import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
const TaskItem = props => {
    return (
        <View style = {styles.itemWrapper}>
            <TouchableOpacity onPress={props.onDelete.bind(this,props.id)} style = {{flex: 5}}>
                <View style={styles.listItem}> 
                    <Text>{props.title}</Text>
                    <Text>{props.endTime}</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {props.onEdit.bind(this, props.id)} style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Image source = {require("../assets/img/edit.png")} style = {styles.editIcon} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      },
      itemWrapper: {
          display: "flex",
          flexDirection: "row",
      },
      editIcon: {
          resizeMode: "contain",
      }
});
export default TaskItem;