import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from 'styles/colors';

interface Props {
  onPress: () => void
}

const BackButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AntDesign name="caretleft" size={24} color={colors.border} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent:'center',
  },
})


export default BackButton;