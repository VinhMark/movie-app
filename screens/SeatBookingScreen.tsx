import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR, FONTSIZE, FONT_FAMILY, SPACING } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import { baseImagePath } from '../api/apiCalls';
import { MaterialIcons } from '@expo/vector-icons';

const timeArray: string[] = ['10:30', '12:30', '14:30', '15:00', '19:30', '21:30'];

const generateDate = (): string[] => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }

  return weekdays;
};

const generateSeat = () => {
  let numRow = 8;
  let numColumn = 3;
  let rows = [];
  let start = 1;
  let reachNine = false;

  for (let i = 0; i < numRow; i++) {
    let columns = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columns.push(seatObject);
      start++;
    }

    if (i === 3) {
      numColumn += 2;
    }

    if (numColumn < 9 && !reachNine) {
      numColumn += 2;
    } else {
      reachNine = true;
      numColumn -= 2;
    }
    rows.push(columns);
  }

  return rows;
};

const SeatBookingScreen = ({ navigation, route }: any) => {
  const [dateArray, setDateArray] = useState<string[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);

  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeat());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const selectSeat = (index: number, subIndex: number, num: number) => {
    if (!twoDSeatArray[index][subIndex].taken) {
      let array = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subIndex].selected = !temp[index][subIndex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempIndex = array.indexOf(num);
        if (tempIndex > -1) {
          array.splice(tempIndex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']}>
      <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: baseImagePath('w500', route.params?.bgImage) }}
          style={styles.bgImage}
        >
          <LinearGradient colors={[COLOR.BlackRGB10, COLOR.Black]} style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader header='' action={() => navigation.goBack()} />
            </View>
          </LinearGradient>
        </ImageBackground>

        <Text style={styles.screenText}>Screen this side</Text>

        <View style={styles.seatContainer}>
          <View style={styles.containerGap20}>
            {twoDSeatArray.map((item, index) => (
              <View key={index} style={styles.seatRow}>
                {item?.map((subItem, subIndex) => (
                  <TouchableOpacity
                    disabled={subItem.taken}
                    key={`${index}-${subIndex}`}
                    onPress={() => {
                      selectSeat(index, subIndex, subItem.number);
                    }}
                  >
                    <MaterialIcons
                      name='event-seat'
                      size={FONTSIZE.size_24}
                      color={COLOR.White}
                      style={[
                        subItem.taken && { color: COLOR.WhiteRGBA32 },
                        subItem.selected && { color: COLOR.Orange },
                      ]}
                    />
                    <Text
                      style={{ color: 'white', fontSize: FONTSIZE.size_10, textAlign: 'center' }}
                    >
                      {index}-{subIndex}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLOR.Black,
  },
  bgImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_12,
  },
  screenText: {
    color: COLOR.WhiteRGBA50,
    textAlign: 'center',
    fontSize: FONTSIZE.size_12,
    fontFamily: FONT_FAMILY.poppins_regular,
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
  },
  containerGap20: {
    gap: SPACING.space_8,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.space_18,
  },
});
