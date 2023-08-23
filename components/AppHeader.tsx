import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { BORDER_RADIUS, COLOR, FONTSIZE, FONT_FAMILY, SPACING } from '../theme/theme';
import { Movie } from '../utils/type';

interface AppHeaderProps {
  header: string;
  action: () => void;
}

const AppHeader = ({ header, action }: AppHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}></View>

      <Text numberOfLines={1} style={styles.headerText}>
        {header}
      </Text>

      <TouchableOpacity style={styles.iconStyle} onPress={() => action()}>
        <AntDesign
          name='close'
          size={FONTSIZE.size_20}
          color={COLOR.White}
          style={{ padding: 7 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_10,
  },
  iconStyle: {
    backgroundColor: COLOR.Orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.radius_20,
  },
  headerText: {
    flex: 1,
    fontFamily: FONT_FAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    color: COLOR.White,
    textAlign: 'center',
  },
  emptyContainer: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
    // backgroundColor: COLOR.White,
  },
});
