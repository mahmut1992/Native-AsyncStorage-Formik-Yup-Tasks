import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../theme/color';
import {Add} from 'iconsax-react-native';

const FloatActionButton = props => {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <Add size="32" color={colors.WHITE} />
    </TouchableOpacity>
  );
};

export default FloatActionButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ONGOING,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
    right: 20,
    position: 'absolute',
  },
});
