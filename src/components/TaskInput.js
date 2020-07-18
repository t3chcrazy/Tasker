import React,{useState} from 'react';
import {View, TextInput, Button, StyleSheet,Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { scheduleLocalNotification } from '../services/LocalPushController'

const TaskInput = props => {
    const [enteredTask, setEnteredTask] = useState('');
    const [date, setDate] = useState(() => Date.now());
    const [show, setShow] = useState(false);
    const taskInputHandler = (enteredTask) =>  {
        setEnteredTask(enteredTask);
    };
    const addTaskHandler = () => {
      props.onAddTask(enteredTask);
      setShow(true);
      setEnteredTask('');
    }
    // Handle changes in time picker value
    const handleTimeChange = (event, selected) => {
      const currDate = selected || date;
      setShow(false);
      if (currDate.getTime() !== date.getTime()) {
        scheduleLocalNotification(currDate.getTime()-new Date(Date.now()).getTime());
        setDate(currDate);
      };
    }
    return(
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
          </View>
      </View>
      {show && 
      <DateTimePicker
        onChange = {handleTimeChange}
        value = {date}
        mode = "time"
        is24Hour = {true}
        display = "clock"
      />}
    </Modal>
    );
};
const styles = StyleSheet.create({
    inputContainer:{
        flex:1,
        justifyContent:'center', 
        alignItems:'center'
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
      width:"60%"
    },
    button:{
      width:"40%"
    }      
})

export default TaskInput;