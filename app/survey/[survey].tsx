import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSurveyStore, Question } from '../../store/useSurveyStore'
import colors from '../../styles/colors'
import useCapitalizeFirstLetter from '../../hooks/useCapitalizeFirstLetter'
import BackButton from '@components/BackButton'

export default function SurveyScreen() {
  const router = useRouter()
  const surveys = useSurveyStore((s) => s.surveys)
  const submitResponse = useSurveyStore((s) => s.submitResponse)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const { survey } = useLocalSearchParams<{ survey: string }>()
  const surveyData = useSurveyStore((s) => s.getSurveyById(survey))

  if (!surveyData) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Encuesta no encontrada</Text>
      </View>
    )
  }

  const handleChange = (qid: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }))
  }

  const onSubmit = () => {
    submitResponse(surveyData.id, answers)
    router.push('/(tabs)/result')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.title}>{useCapitalizeFirstLetter(surveyData.title)}</Text>
      </View>
      {surveyData.questions.map((question: Question) => (
        <View key={question.id} style={styles.questionBlock}>
          <Text style={styles.questionText}>{useCapitalizeFirstLetter(question.text)}</Text>

          {question.type === 'text' && (
            <TextInput
              style={styles.input}
              placeholder="Answer"
              value={answers[question.id] || ''}
              onChangeText={(t) => handleChange(question.id, t)}
              placeholderTextColor={colors.border}
            />
          )}

          {question.type === 'multiple' && question.options && (
            <FlatList
              data={question.options}
              keyExtractor={(opt) => opt}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    answers[question.id] === item && styles.optionSelected,
                  ]}
                  onPress={() => handleChange(question.id, item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      answers[question.id] === item && styles.optionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}

          {question.type === 'rating' && (
            <TextInput
              style={styles.input}
              placeholder="1–5"
              keyboardType="number-pad"
              maxLength={1}
              value={answers[question.id] || ''}
              onChangeText={(t) => handleChange(question.id, t.replace(/[^1-5]/g, ''))}
              placeholderTextColor={colors.border}
            />
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
        <Text style={styles.submitText}>SEND ANSWERS</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bg,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginVertical: 16,
  },
  questionBlock: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 8,
    backgroundColor: colors.bgLight,
    marginBottom: 8,
    color: '#FFFFFF'
  },
  optionButton: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.textSub,
    marginBottom: 8,
    backgroundColor: colors.bgLight,
  },
  optionSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  optionText: {
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.surface,
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: 24,
    backgroundColor:colors.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
  error: {
    color: colors.error,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
})
