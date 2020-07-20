import React,{useState} from 'react';
import {View, TextInput, Button, StyleSheet,Modal, TouchableOpacity, Image, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { scheduleLocalNotification } from '../services/LocalPushController'

const TaskInput = props => {
    const [enteredTask, setEnteredTask] = useState('');
    const [date, setDate] = useState(() => new Date(Date.now()));
    const [show, setShow] = useState(false);
    const taskInputHandler = (enteredTask) =>  {
        setEnteredTask(enteredTask);
    };
    const addTaskHandler = () => {
      props.onAddTask({taskTitle: enteredTask, endTime: date.toLocaleTimeString("en-US").substring(0, 5)});
      setEnteredTask('');
    }
    // Handle changes in time picker value
    const handleTimeChange = (event, selected) => {
      const currDate = selected || date;
      console.log(currDate.toLocaleTimeString([], {is24Hour: false}))
      setShow(false);
      if (currDate.getTime() !== date.getTime()) {
        currDate.setSeconds(0);
        scheduleLocalNotification(currDate.getTime()-new Date(Date.now()).getTime(), enteredTask);
        setDate(currDate);
      };
    }
    return(
      <>
        <Modal visible={props.visible} animationType="slide">
          <View style={styles.inputContainer}>
            <View style = {styles.topRow}>
              <TextInput 
                placeholder="Input YOUR TASK !!" 
                style={styles.input} 
                onChangeText={taskInputHandler}
                value={enteredTask}
              />
              <TouchableOpacity onPress = {() => setShow(true)}>
                <View style = {styles.addTime}>
                  <Image source = {require("../assets/img/timer.png")} style = {styles.icon} />
                  <Text style = {{color: "#fff", fontSize: 10}}>Add time</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Cancel" color="red" onPress={props.onCancel}></Button>
              </View>
              <View style={styles.button}>
                <Button title="Add Task" onPress={addTaskHandler}></Button>
              </View>
            </View>
        </View>
        </Modal>
        {show && 
          <DateTimePicker
            onChange = {handleTimeChange}
            value = {date}
            mode = "time"
            is24Hour = {false}
            display = "clock"
          />}
      </>
      );
};
const styles = StyleSheet.create({
    inputContainer:{
        flex:1,
        justifyContent:'center', 
        alignItems:'center',
    },
    input:{
      width: "60%", 
    borderWidth:1, 
    borderColor:"black", 
    padding:10,
    },
    buttonContainer:{
      flexDirection:"row",
      justifyContent:'space-around',
      width:"60%",
      flexWrap: "wrap",
    },
    button:{
      width:"40%"
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 5
    },
    topRow: {
      flexDirection: "row",
      width: "80%",
      marginHorizontal: "10%",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20
    },
    addTime: {
      marginTop: 10,
      padding: 10,
      borderRadius: 2, 
      flexDirection: "row",
      backgroundColor: "green",
      elevation: 5,
      alignItems: "center",
      marginBottom: 10,
      marginLeft: 10
    }
})

export default TaskInput;