import React,{useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet,Modal, TouchableOpacity, Image, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { scheduleLocalNotification, cancelLocalNotification } from '../services/LocalPushController'

const generateRandomInt = () => Math.round(Math.random()*2**30).toString()

const TaskInput = props => {
    const [enteredTask, setEnteredTask] = useState('');
    const [date, setDate] = useState(() => new Date(Date.now()));
    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [time, setTime] = useState(() => new Date(Date.now()));
    const [currId, setCurrId] = useState(null)
    const taskInputHandler = (enteredTask) =>  {
        setEnteredTask(enteredTask);
    };
    const addTaskHandler = () => {
      const finalDate = date
      finalDate.setHours(time.getHours(), time.getMinutes(), 0)
      scheduleLocalNotification(finalDate, enteredTask, currId);
      props.onAddTask({id: currId, taskTitle: enteredTask, endTime: finalDate});
      setEnteredTask('');
    }
    // Handle changes in date picker value
    const handleDateChange = (event, selected) => {
      const currDate = selected || date;
      console.log("Event object for date change", event)
      setShow(false);
      setDate(prev => prev.getTime() === currDate.getTime()? prev: currDate);
      if (event.type === "set") {
        setShowTime(true);
      }
    }
    // Handle changes in time picker value
    const handleTimeChange = (event, selected) => {
      setShowTime(false);
      console.log(selected.getHours(), selected)
      if (event.type === "set") {
        const currTime = selected || time;
        currTime.setSeconds(0);
        setTime(currTime);
      }
    }
    const editTaskHandler = () => {
      cancelLocalNotification(props.editTaskId)
      const finalDate = date
      finalDate.setHours(time.getHours(), time.getMinutes(), 0)
      console.log(finalDate)
      scheduleLocalNotification(finalDate, enteredTask, props.editTaskId);
      props.editFinish({id: props.editTaskId, taskTitle: enteredTask, endTime: finalDate});
      setEnteredTask("")
    }
    const handleCancelPress = () => {
      setCurrId(null)
      props.onCancel()
    }
    useEffect(() => {
      console.log(props.tasks)
      if (props.visible) {
        if (props.editTaskId !== null) {
          const editableTask = props.tasks.find(task => task.id === props.editTaskId)
          console.log("Setting time for editing", editableTask.endTime)
          setEnteredTask(editableTask.taskTitle)
          setDate(editableTask.endTime)
          setTime(editableTask.endTime)
          setCurrId(editableTask.id)
        }
        else {
          setEnteredTask("")
          setCurrId(generateRandomInt())
        }
      }
    }, [props.visible])
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
                <Button title="Cancel" color="red" onPress={handleCancelPress}></Button>
              </View>
              <View style={styles.button}>
                <Button title={props.editTaskId === null? "Add task": "Edit task"} onPress={props.editTaskId === null? addTaskHandler: editTaskHandler}></Button>
              </View>
            </View>
        </View>
        </Modal>
        {show && 
          <DateTimePicker
            onChange = {handleDateChange}
            value = {date}
          />}
          {showTime && 
          <DateTimePicker
            onChange = {handleTimeChange}
            value = {time}
            is24Hour = {false}
            mode = "time"
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