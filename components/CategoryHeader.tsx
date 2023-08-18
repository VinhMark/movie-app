import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { COLOR, FONTSIZE, FONT_FAMILY, SPACING } from '../theme/theme';

interface CategoryHeaderProps {
  title: string;
}

const CategoryHeader = ({ title }: CategoryHeaderProps) => {
  return <Text style={styles.text}>{title}</Text>;
};

export default CategoryHeader;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONT_FAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLOR.White,
    paddingHorizontal: SPACING.space_36,
    paddingTop: SPACING.space_28,
  },
});
