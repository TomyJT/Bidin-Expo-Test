import React from 'react'
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import colors from '../../styles/colors'
import { useSurveyStore } from '@store/useSurveyStore'
import SurveyAnswers from '@components/SurveyAnswers'

export default function ResultScreen() {
  const router = useRouter()
  const surveys = useSurveyStore((s) => s.surveys)
  const surveysWithResponses = surveys.filter((s) => s.responses.length > 0)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Survey Answers</Text>
      {surveysWithResponses.length == 0 ?
        <View style={styles.emptyState}>
          <Text  style={[styles.title, {fontSize:18}]}>There's no answers yet!</Text>
        </View> 
        : 
        <>
          {surveysWithResponses.map((survey) => (
            <SurveyAnswers survey={survey} key={survey.id} />
          ))}
        </>
      }
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)')}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.bg,
    minHeight:"100%",
    position:'relative',
    alignItems:'center',
    paddingBottom: 50,
  },
  emptyState: {
    height:100,
    width: '100%',
    alignItems:'center',
    justifyContent:'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 16,
    color: colors.text,
  },
  button:{
    backgroundColor:colors.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText:{
    color: colors.surface,
    fontWeight: '600',
    fontSize: 16,
  }
})
