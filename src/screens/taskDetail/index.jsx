import {ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../theme/color';
import {status, taskValues} from '../../utils/constant';
import moment from 'moment';
import {setCategory} from '../../utils/functions';
import {Button} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../utils/routes';

const {TASKS} = SCREENS;

const TaskDetail = ({route}) => {
  const {item} = route?.params;
  const navigation = useNavigation();
  const deleteTask = async () => {
    try {
      // mevcut task ları al
      const savedTaks = await AsyncStorage.getItem('task');
      if (!savedTaks) {
        return;
      } else {
        const tasks = JSON.parse(savedTaks);
        // silinecek task ı filtrele
        const filteredTasks = tasks.filter(task => task.id !== item.id);
        await AsyncStorage.setItem('task', JSON.stringify(filteredTasks));
      }
      navigation.navigate(TASKS);
    } catch (error) {
      console.error('Task Silinirken Bir Hata Oluştu...', error);
    }
  };

  const updateTask = async newStatus => {
    try {
      const savedTaks = await AsyncStorage.getItem('task');
      if (!savedTaks) return;

      const tasks = JSON.parse(savedTaks);

      const updatedTasks = tasks.map(task =>
        task.id === item.id ? {...task, status: newStatus} : task,
      );

      await AsyncStorage.setItem('task', JSON.stringify(updatedTasks));
      navigation.navigate(TASKS);
    } catch (error) {
      console.error('Güncelleme Sırasında bir Hata Oluştu...', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Title : </Text>
          <Text> {item.title} </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Description : </Text>
          <Text> {item.description} </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Start Date : </Text>
          <Text> {moment(item.startDate).format('DD.MM.YYYY')} </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>End Date : </Text>
          <Text> {moment(item.endDate).format('DD.MM.YYYY')} </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Title : </Text>
          <Text> {item.title} </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Status : </Text>
          <Text>
            {taskValues.find(task => task.status === item?.status)?.title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Category : </Text>
          <Text>{setCategory(item.category)}</Text>
        </View>
      </ScrollView>
      <View style={{bottom: 20}}>
        <Button
          onPress={() => updateTask(status.PENDING)}
          style={styles.button}
          status="primary">
          START
        </Button>
        <Button
          onPress={() => updateTask(status.COMPLATED)}
          style={styles.button}
          status="success">
          COMPLATED
        </Button>
        <Button
          onPress={() => updateTask(status.CANCEL)}
          style={styles.button}
          status="danger">
          CANCEL
        </Button>
        <Button onPress={deleteTask} style={styles.button} status="warning">
          DELETE
        </Button>
      </View>
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 10,
  },
  button: {
    marginVertical: 5,
  },
});
