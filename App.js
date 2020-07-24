import React,{ useState } from 'react';
import { StyleSheet, View, FlatList,Button, ScrllView, ScrollView} from 'react-native';
import TaskItem from './src/components/TaskItem';
import TaskInput from './src/components/TaskInput';
import Header from './src/components/Header';
import {cancelLocalNotification} from './src/services/LocalPushController'

export default function App() {
  const [courseTasks, setCourseTasks] = useState([]);
  const [isAddMore, setIsAddMore] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null)

  const addTaskHandler = (taskObj) => {
    setCourseTasks(currentTasks => [
      ...currentTasks,
      taskObj
    ]);
    setIsAddMore(false);
  };

  const removeTaskHandler = taskId => {
    setCourseTasks(currentTasks=>{
      return currentTasks.filter((task)=>task.id !== taskId);
    });
    cancelLocalNotification(taskId)
    console.log("I am trying to cancel this")
  };

  const cancelTaskAdditionalHandler = () => {
    setIsAddMore(false);
    setEditTaskId(prev => prev !== null? null: prev)
  }

  const editTaskHandler = taskId => {
    setEditTaskId(taskId)
    setIsAddMore(true)
  }

  const editFinishHandler = (newTask) => {
    setCourseTasks(currentTasks => currentTasks.map(task => task.id === editTaskId? newTask: task))
    setEditTaskId(null)
    setIsAddMore(false)
  }

  return (
    
      <ScrollView>
        <Header />

      <View style={styles.screen}>
        
        <Button title="Add New Task" onPress={()=>setIsAddMore(true)}/>
        <TaskInput visible={isAddMore} onAddTask = {addTaskHandler} onCancel={cancelTaskAdditionalHandler} editTaskId = {editTaskId} tasks = {courseTasks} editFinish = {editFinishHandler} />
        {/* <FlatList
          keyExtractor={(item,index)=>item.id.toString()} 
          data={courseTasks} 
          renderItem={itemData => <TaskItem id={itemData.item.id} onDelete={removeTaskHandler} title={itemData.item.taskTitle} endTime = {itemData.item.endTime} onEdit = {editTaskHandler} />} 
          contentContainerStyle = {{flexDirection: "column"}}
        /> */}
        {courseTasks.map(item => <TaskItem key = {`task${item.id}`} id={item.id} onDelete={removeTaskHandler} title={item.taskTitle} endTime = {item.endTime} onEdit = {editTaskHandler} />)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:{
    padding:50
  },
 
})