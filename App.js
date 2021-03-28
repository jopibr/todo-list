import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {
    KeyboardAvoidingView, Platform, StyleSheet, Text,
    TextInput, View, TouchableOpacity, Keyboard
} from 'react-native';
import Task from './components/Task';

export default function App() {

    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task]);
        setTask(null);
    };

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
    };


    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}>Atividades do dia</Text>
                <View style={styles.items}>
                    {/* As atividades ficarao aqui! */}
                    {
                        taskItems.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={()=>{completeTask(index)}}>
                                    <Task  text={item}/>
                                </TouchableOpacity>
                                )
                        })
                    }
                </View>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                  style={styles.writeTaskWapper}>
                <TextInput style={styles.input} placeholder={'Nova atividade'}
                           value={task}
                           onChangeText={text => setTask(text)}
                />

                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
                <View>

                </View>


            </KeyboardAvoidingView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    taskWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30
    },
    writeTaskWapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 50,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1
    },
    addText: {}
});
