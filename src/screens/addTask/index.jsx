import {Alert, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import uuid from 'react-native-uuid';
import {Button, Input, Radio, RadioGroup} from '@ui-kitten/components';
import CustomDatePicker from '../../components/uı/customDatePicker';
import {taskSchema} from '../../utils/validations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {status} from '../../utils/constant';

const AddTask = ({navigation}) => {
  const saveTask = async values => {
    try {
      const savedTask = await AsyncStorage.getItem('task');
      let myTask = savedTask ? JSON.parse(savedTask) : [];
      myTask.push(values);

      await AsyncStorage.setItem('task', JSON.stringify(myTask));
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          id: uuid.v4(),
          title: '',
          description: '',
          startDate: null,
          endDate: null,
          category: null,
          status: status.ONGOING,
        }}
        validationSchema={taskSchema}
        onSubmit={values => saveTask(values)}>
        {({values, errors, handleChange, handleSubmit, setFieldValue}) => (
          <View>
            <Input
              size="large"
              style={{marginVertical: 10}}
              label="Title"
              placeholder=""
              value={values.title}
              onChangeText={handleChange('title')}
              status={errors.title ? 'danger' : 'basic'}
              caption={errors.title}
            />
            <Input
              size="large"
              style={{marginVertical: 10}}
              label="Description"
              placeholder=""
              value={values.description}
              onChangeText={handleChange('description')}
              status={errors.description ? 'danger' : 'basic'}
              caption={errors.description}
            />
            <CustomDatePicker
              size="large"
              style={{marginVertical: 10}}
              date={values.startDate}
              onSelectDate={date => setFieldValue('startDate', date)}
              label={'Start Date'}
              status={errors.startDate ? 'danger' : 'basic'}
              caption={errors.startDate}
            />
            <CustomDatePicker
              size="large"
              style={{marginVertical: 10}}
              date={values.endDate}
              onSelectDate={date => setFieldValue('endDate', date)}
              label={'End Date'}
              status={errors.endDate ? 'danger' : 'basic'}
              caption={errors.endDate}
            />
            <RadioGroup
              selectedIndex={values.category}
              onChange={index => setFieldValue('category', index)}>
              <Radio status="success">SoftWare</Radio>
              <Radio status="success">Design</Radio>
              <Radio status="success">Oparation</Radio>
            </RadioGroup>
            <Button
              onPress={handleSubmit}
              status="success"
              style={{marginTop: 40}}>
              CREATE
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
