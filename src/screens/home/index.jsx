import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from './headerComponent';
import FloatActionButton from '../../components/uı/floatActionButton';
import {SCREENS} from '../../utils/routes';
import TaskCard from '../../components/taskCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

const {ADDTASKS, TASKS, TASKDETAİL} = SCREENS;

const Home = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [ongoing, setOngoing] = useState(0);
  const [pending, setPending] = useState(0);
  const [complated, setComplated] = useState(0);
  const [cancel, setCancel] = useState(0);

  const getTask = async () => {
    try {
      const savedTask = await AsyncStorage.getItem('task');
      setTasks(JSON.parse(savedTask));
      setFilteredTasks(JSON.parse(savedTask));
      let ongoingCount = 0;
      let pendingCount = 0;
      let complatedCount = 0;
      let cancelCount = 0;
      for (const task of JSON.parse(savedTask)) {
        if (task.status === 1) {
          ongoingCount++;
        }
        if (task.status === 2) {
          pendingCount++;
        }
        if (task.status === 3) {
          complatedCount++;
        }
        if (task.status === 4) {
          cancelCount++;
        }
        setOngoing(ongoingCount);
        setPending(pendingCount);
        setComplated(complatedCount);
        setCancel(cancelCount);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = status => {
    if (status === 0) {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTask();
    }, []),
  );
  const onRefresh = async () => {
    setRefreshing(true);
    await getTask();
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <HeaderComponent
            onFilter={handleFilter}
            ongoing={ongoing}
            pending={pending}
            complated={complated}
            cancel={cancel}
          />
        }
        data={filteredTasks}
        renderItem={({item}) => <TaskCard item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <FloatActionButton onPress={() => navigation.navigate(ADDTASKS)} />
      {/* <TaskCard /> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
