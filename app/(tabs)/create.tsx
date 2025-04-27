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
  const [multipleOptions, setMultipleOptions] = useState(['', ''])
  const [questions, setQuestions] = useState<Question[]>([])

  const addQuestion = () => {
    if (!newQuestionText.trim()) return
    const opts = newQuestionType === 'multiple'
      ? multipleOptions.filter(o => o.trim() !== '')
      : undefined

    const question: Question = {
      id: uuidv4(),
      text: newQuestionText.trim(),
      type: newQuestionType,
      options: opts,
    }

    setQuestions(prev => [...prev, question])
    setNewQuestionText('')
    setNewQuestionType('text')
    setMultipleOptions(['', ''])
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

  const handleMultipleOptions = (text: string, index: number) => {
    const updated = [...multipleOptions]
    updated[index] = text
    setMultipleOptions(updated)
  }

  const addOption = () => {
    setMultipleOptions(prev => [...prev, ''])
  }

  const removeLastOption = () => {
    if (multipleOptions.length <= 2) return
    setMultipleOptions(prev => prev.slice(0, -1))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create new survey</Text>
      <TextInput
        style={styles.input}
        placeholder="Survey´s title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={colors.border}
      />
      <View style={styles.separator} />
      <Text style={styles.subHeading}>Create a question</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your question"
        value={newQuestionText}
        onChangeText={setNewQuestionText}
        placeholderTextColor={colors.border}
      />
      {newQuestionType === 'multiple' && 
        <>
          {multipleOptions.map((option, index) => (
            <TextInput
            style={styles.input}
            placeholder={`Option ${index + 1}`}
            value={option}
            onChangeText={text => handleMultipleOptions(text, index)}
            placeholderTextColor={colors.border}
            key={index}
            />
          ))}
          <View style={styles.optionButtons}>
          <TouchableOpacity style={styles.addOptionButton} onPress={addOption}>
            <Text style={styles.addOptionText}>Add option +</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addOptionButton} onPress={removeLastOption}>
            <Text style={styles.addOptionText}>Remove option -</Text>
          </TouchableOpacity>
          </View>
        </>
      }
      <View style={[styles.input, { padding: 0 }]}>
        <Picker
          selectedValue={newQuestionType}
          onValueChange={(val) => setNewQuestionType(val)}
          style={{color: colors.border}}
          dropdownIconColor={colors.border}
          dropdownIconRippleColor={colors.secondary}
        >
          <Picker.Item color={colors.bgLight} label="Message" value="text" />
          <Picker.Item color={colors.bgLight} label="Multiple Choice" value="multiple" />
          <Picker.Item color={colors.bgLight} label="Rating (1–5)" value="rating" />
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
      <TouchableOpacity
        style={styles.createButton}
        onPress={onAddSurvey}
      >
        <Text style={styles.createButtonText}>
          Save survey
        </Text>
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
    borderColor: colors.border,
    borderRadius: 6,
    padding: 8,
    backgroundColor: colors.bgLight,
    marginBottom: 8,
    color: '#FFFFFF'
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
  createButton: {
    marginTop: 16,
    backgroundColor:colors.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: 16,
  },
  optionButtons: {
    width: '100%',
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom: 10
  },
  addOptionButton:{
    width: '30%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  addOptionText:{
    color: colors.secondary,
    paddingVertical: 5,
    fontSize:18
  },
})
