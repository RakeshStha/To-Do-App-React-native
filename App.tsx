/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Keyboard
} from 'react-native';
import Task from "./components/Task";

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {

    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const date = new Date();

    const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null)
    }

    const completeTask = (index) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
    }

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={styles.container}>
        <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}> Today's tasks</Text>
        <Text style={styles.textTime}>{date.toString().slice(0, 25)}</Text>
        <View style={styles.items}>

        {taskItems.length <= 0 ?
        <Text style={styles.noTask}> No task available</Text>
        :  taskItems.map((item, index) => {
                   return <TouchableOpacity  onPress={() => completeTask(index)}>
                   <Task index={index} text={item}/>
                   </TouchableOpacity>
                  })
        }

        </View>
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
        >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={e => setTask(e)}/>
        <TouchableOpacity onPress={() => handleAddTask()}>
        <View style={styles.addWrapper}>
        <Text style={styles.addText}>+</Text>
        </View>
        </TouchableOpacity>
        </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },
  taskWrapper: {
  paddingTop: 80,
  paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textTime:{
  fontSize: 12,
  paddingTop: 8,
  paddingHorizontal: 10
  },
  noTask:{
   fontSize: 16,
   padding: 15,
   paddingHorizontal: 10,
   backgroundColor: '#fff',
   borderRadius: 10
  },
  items:{
  marginTop: 30,
  },
  writeTaskWrapper: {
  position: 'absolute',
  bottom: 60,
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  },
  input: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: '#fff',
  borderRadius: 15,
  borderColor: '#c0c0c0',
  borderWidth: 1,
  width: 250
  },
  addWrapper:{
  width: 50,
  height: 50,
  backgroundColor: '#3b5998',
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: "center",
  borderColor: '#3b5998',
  color: '#fff',
  borderWidth: 1,
  },
  addText:{color: '#fff', fontSize: 16, fontWeight: 'bold'}
});

export default App;
