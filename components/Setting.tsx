import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { COLOR } from '../theme/theme';

interface SettingProps {
  icon: React.ReactNode;
  header: string;
  subHeader: string;
  subTitle: string;
}

const Setting = ({ icon, header, subHeader, subTitle }: SettingProps) => {
  return (
    <View style={styles.container}>
      {icon}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View>
          <Text style={{ color: 'white', fontSize: 16 }}>{header}</Text>
          <Text style={{ color: COLOR.WhiteRGBA50, fontSize: 12 }}>{subHeader}</Text>
          <Text style={{ color: COLOR.WhiteRGBA50, fontSize: 12 }}>{subTitle}</Text>
        </View>

        <Entypo name='chevron-right' size={24} color='white' />
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 17,
    marginBottom: 30,
  },
});
