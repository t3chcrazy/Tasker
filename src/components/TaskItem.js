import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
const TaskItem = props => {
    return (
        <TouchableOpacity onPress={props.onDelete.bind(this,props.id)}>
            <View style={styles.listItem}> 
                <Text>{props.title}</Text>
                <Text>{props.endTime}</Text> 
            </View>
        </TouchableOpacity>
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
        justifyContent: "space-between"
      }
});
export default TaskItem;