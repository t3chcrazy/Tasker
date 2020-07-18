import React,{useState} from 'react';
import {View, TextInput, Button, StyleSheet,Modal} from 'react-native';

const TaskInput = props => {
    const [enteredTask, setEnteredTask] = useState('');
    const taskInputHandler = (enteredTask) =>  {
        setEnteredTask(enteredTask);
    };
    const addTaskHandler = () => {
      props.onAddTask(enteredTask);
      setEnteredTask('');
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