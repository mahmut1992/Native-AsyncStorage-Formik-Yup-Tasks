import {
  ArrowCircleRight2,
  ChartCircle,
  Clock,
  CloseCircle,
  TickCircle,
} from 'iconsax-react-native';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import colors from '../../theme/color';

const HeaderComponent = ({ongoing, pending, complated, cancel, onFilter}) => {
  const tasks = [
    {
      id: 1,
      title: 'Ongoing',
      color: colors.ONGOING,
      icon: <ChartCircle size="32" color={colors.WHITE} />,
      count: ongoing,
      status: 1,
    },
    {
      id: 2,
      title: 'Pending',
      color: colors.PENDING,
      icon: <Clock size="32" color={colors.WHITE} />,
      count: pending,
      status: 2,
    },
    {
      id: 3,
      title: 'Complated',
      color: colors.COMPLATED,
      icon: <TickCircle size="32" color={colors.WHITE} />,
      count: complated,
      status: 3,
    },
    {
      id: 4,
      title: 'Cancel',
      color: colors.CANCEL,
      icon: <CloseCircle size="32" color={colors.WHITE} />,
      count: cancel,
      status: 4,
    },
  ];

  const Tasks = ({item}) => {
    return (
      <Pressable
        style={{
          width: '45%',
          backgroundColor: item.color,
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}>
        {item.icon}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <View>
            <Text
              style={{
                color: colors.WHITE,
                fontSize: 16,
                fontWeight: '600',
                marginTop: 5,
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                color: colors.WHITE,
                fontSize: 16,
                fontWeight: '600',
                marginTop: 5,
              }}>
              {item.count} Task
            </Text>
          </View>
          <Pressable onPress={() => onFilter(item.status)}>
            <ArrowCircleRight2 size="32" color={colors.WHITE} />
          </Pressable>
        </View>
      </Pressable>
    );
  };
  return (
    <View>
      <FlatList
        numColumns={2}
        data={tasks}
        renderItem={({item}) => <Tasks item={item} />}
      />
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            margin: 10,
            marginHorizontal: 15,
          }}>
          All Tasks
        </Text>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({});
