import { Survey } from '@store/useSurveyStore';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from 'styles/colors';

interface Props {
  survey: Survey
}

const SurveyAnswers: React.FC<Props> = ({ survey }) => {
  return (
    <View key={survey.id} style={styles.surveyBlock}>
      <Text style={styles.surveyTitle}>{survey.title}</Text>
      {survey.responses.map((response, index) => (
        <View key={index} style={styles.responseBlock}>
          {response.map((answer) => {
            const question = survey.questions.find((q) => q.id === answer.questionId)
            return (
              <View key={answer.questionId} style={styles.qna}>
                <Text style={styles.question}>
                  {question?.text || 'Pregunta desconocida'}
                </Text>
                <Text style={styles.answer}>{answer.response}</Text>
              </View>
            )
          })}
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  surveyBlock: {
    backgroundColor: colors.bgLight,
    borderWidth: 1,
    borderColor:colors.border,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal:16,
    marginVertical: 16,
    width: '100%',
  },
  surveyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text,
  },
  responseBlock: {
    padding: 8,
    borderRadius: 8,
  },
  qna: {
    marginBottom: 6,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  answer: {
    fontSize: 16,
    color: colors.textSub,
    marginLeft: 8,
  },
})


export default SurveyAnswers;