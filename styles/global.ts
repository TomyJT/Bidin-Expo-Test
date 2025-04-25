import { StyleSheet } from 'react-native'
import colors from './colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
    padding: 0,
  },
  screen: {
    flex: 1,
    padding: 16,
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
})