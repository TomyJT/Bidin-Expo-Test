import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from 'styles/colors';

interface Props {
  title: string
  subtitle: string
  onPress: () => void
}

const SurveyCard: React.FC<Props> = ({ title, subtitle, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.button} >
        <Text style={styles.buttonText}>Answer</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor:colors.border,
    borderRadius:10,
    padding: 16,
    width:"100%",
    flexDirection: "row",
    justifyContent:"space-between",
    marginBlock: 8,
  },
  textContainer: {
    alignItems:"flex-start",
    width:"50%"
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSub,
    marginTop: 4,
  },
  button: {
    width:"20%",
    backgroundColor: colors.primary,
    alignItems:"center",
    justifyContent:"center",
    borderRadius: 10
  },
  buttonText:{
    color: colors.surface,
    fontWeight: '600',
    fontSize: 16,
  }
})


export default SurveyCard;