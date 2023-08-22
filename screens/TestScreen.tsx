import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR } from '../theme/theme';

const TestScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView bounces={false} style={styles.container}>
        <View>
          <Text>TestScreen</Text>

          <TouchableOpacity
            style={{ justifyContent: 'center', height: 600 }}
            onPress={() => navigation.push('SeatBooking')}
          >
            <Text>TestScreen</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLOR.Grey,
    // alignItems: 'center',
  },
});
