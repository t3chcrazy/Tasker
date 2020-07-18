import React,{ useState } from 'react';
import { StyleSheet, View, FlatList,Button } from 'react-native';
import TaskItem from './src/components/TaskItem';
import TaskInput from './src/components/TaskInput';
import Header from './src/components/Header';

export default function App() {
  const [courseTasks, setCourseTasks] = useState([]);
  const [isAddMore, setIsAddMore] = useState(false);

  const addTaskHandler = (taskTitle) => {
    setCourseTasks(currentTasks => [
      ...currentTasks, 
      {id: Math.random().toString(), value: taskTitle } 
    ]);
    setIsAddMore(false);
  };

  const removeTaskHandler = taskId => {
    setCourseTasks(currentTasks=>{
      return currentTasks.filter((task)=>task.id !== taskId);
    });
  };

  const cancelTaskAdditionalHandler = () => {
    setIsAddMore(false);

  }
  return (
    
      <View>
        <Header />

      <View style={styles.screen}>
        
        <Button title="Add New Task" onPress={()=>setIsAddMore(true)}/>
        <TaskInput visible={isAddMore} onAddTask = {addTaskHandler} onCancel={cancelTaskAdditionalHandler} />
        <FlatList
        keyExtractor={(item,index)=>item.id} 
        data={courseTasks} 
        renderItem={itemData => <TaskItem id={itemData.item.id} onDelete={removeTaskHandler} title={itemData.item.value} />} />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    padding:50
  },
 
})