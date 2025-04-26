import {Datepicker} from '@ui-kitten/components';

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomDatePicker = props => {
  const {onSelectDate} = props;
  return (
    <Datepicker {...props} onSelect={nextDate => onSelectDate(nextDate)} />
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({});
