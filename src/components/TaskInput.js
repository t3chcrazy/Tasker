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
      props.onAddTask({taskTitle: enteredTask, endTime: date.toLocaleTimeString("en-US")});
      setEnteredTask('');
    }
    // Handle changes in time picker value
    const handleTimeChange = (event, selected) => {
      const currDate = selected || date;
      console.log(currDate.toLocaleTimeString([], {is24Hour: false}))
      setShow(false);
      if (currDate.getTime() !== date.getTime()) {
        scheduleLocalNotification(currDate.getTime()-new Date(Date.now()).getTime());
        setDate(currDate);
      };
    }
    return(
      <>
        <Modal visible={props.visible} animationType="slide">
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder="Input YOUR TASK !!" 
              style={styles.input} 
              onChangeText={taskInputHandler}
              value={enteredTask}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Cancel" color="red" onPress={props.onCancel}></Button>
              </View>
              <View style={styles.button}>
                <Button title="Add Task" onPress={addTaskHandler}></Button>
              </View>
              {/* <View style = {{...styles.button, marginTop: 20, width: "80%"}}>
                <Button title = "Add end time" color = "green" onPress = {() => setShow(true)} />
              </View> */}
              <TouchableOpacity onPress = {() => setShow(true)}>
                <View style = {[styles.button, styles.addTime]}>
                  <Image source = {require("../assets/img/timer.png")} style = {styles.icon} />
                  <Text style = {{color: "#fff"}}>Add time</Text>
                </View>
              </TouchableOpacity>
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
    width:"80%", 
    borderWidth:1, 
    borderColor:"black", 
    padding:10,
    marginBottom:10 
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
    addTime: {
      marginTop: 10, 
      width: "100%",
      padding: 10,
      borderRadius: 2, 
      flexDirection: "row",
      backgroundColor: "green",
      elevation: 5
    }
})

export default TaskInput;