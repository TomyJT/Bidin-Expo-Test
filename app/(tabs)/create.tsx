// app/(tabs)/create.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useRouter } from 'expo-router'
import { v4 as uuidv4 } from 'uuid'
import { useSurveyStore, Question } from '../../store/useSurveyStore'
import colors from '../../styles/colors'

export default function CreateSurveyScreen() {
  const router = useRouter()
  const addSurvey = useSurveyStore((s) => s.addSurvey)

  const [title, setTitle] = useState('')
  const [newQuestionText, setNewQuestionText] = useState('')
  const [newQuestionType, setNewQuestionType] = useState<'text'|'multiple'|'rating'>('text')
  const [firstOption, setFirstOption] = useState("")
  const [secondOption, setSecondOption] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])

  const addQuestion = () => {
    if (!newQuestionText.trim()) return
    const question: Question = {
      id: uuidv4(),
      text: newQuestionText.trim(),
      type: newQuestionType,
      options: newQuestionType === 'multiple'
        ? [firstOption, secondOption] 
        : undefined,
    }
    setQuestions((prev) => [...prev, question])
    setNewQuestionText('')
    setNewQuestionType('text')
  }
  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }
  const resetSurvey = () => {
    setTitle('')
    setNewQuestionText('')
    setNewQuestionType('text')
    setQuestions([])
  }
  const onAddSurvey = () => {
    if (title && questions.length > 0) {
      addSurvey(title.trim(), questions)
      resetSurvey()
      router.push('/(tabs)')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create new survey</Text>
      <TextInput
        style={styles.input}
        placeholder="Survey´s title"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.separator} />
      <Text style={styles.subHeading}>Create a question</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your question"
        value={newQuestionText}
        onChangeText={setNewQuestionText}
      />
      {newQuestionType === 'multiple' && 
        <>
          <TextInput
            style={styles.input}
            placeholder="Option A"
            value={firstOption}
            onChangeText={setFirstOption}
            />
          <TextInput
            style={styles.input}
            placeholder="Option B"
            value={secondOption}
            onChangeText={setSecondOption}
            />
        </>
      }
      <View style={[styles.input, { padding: 0 }]}>
        <Picker
          selectedValue={newQuestionType}
          onValueChange={(val) => setNewQuestionType(val)}
        >
          <Picker.Item label="Message" value="text" />
          <Picker.Item label="Multiple Choice" value="multiple" />
          <Picker.Item label="Rating (1–5)" value="rating" />
        </Picker>
      </View>
      <Button
        title="Add question"
        onPress={addQuestion}
        color={colors.secondary}
      />
      {questions.length > 0 ? (
        <>
          <Text style={[styles.subHeading, { marginTop: 8 }]}>
            Questions
          </Text>
          <FlatList
            data={questions}
            keyExtractor={(q) => q.id}
            renderItem={({ item }) => (
              <View style={styles.questionItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.questionText}>{item.text}</Text>
                  <Text style={styles.questionType}>[{item.type}]</Text>
                </View>
                <TouchableOpacity onPress={() => removeQuestion(item.id)}>
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : <View style={{flex: 1}} />}
      <Button
        title="Save survey"
        onPress={onAddSurvey}
        color={colors.primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bgLight,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginVertical: 16,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.textSub,
    borderRadius: 6,
    padding: 8,
    backgroundColor: colors.surface,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: colors.textSub,
    marginVertical: 12,
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.textSub,
  },
  questionText: {
    fontSize: 16,
    color: colors.text,
  },
  questionType: {
    fontSize: 14,
    color: colors.textSub,
  },
  remove: {
    color: colors.error,
    fontWeight: '600',
    marginLeft: 16,
  },
})
