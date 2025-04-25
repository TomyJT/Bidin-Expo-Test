import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useSurveyStore, Survey } from '@store/useSurveyStore'
import colors from '../../styles/colors'
import SurveyCard from '@components/SurveyCard'

export default function HomeScreen() {
  const surveys = useSurveyStore((s) => s.surveys)
  const router = useRouter()

  const renderItem = ({ item }: { item: Survey }) => (
    <SurveyCard
    title={item.title}
    subtitle={item.questions.length == 1 ? `${item.questions.length} question` : `${item.questions.length} questions`}
    onPress={() => router.push(`/survey/${item.id}`)} />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active surveys</Text>
      <FlatList
        data={surveys}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.navigate('/create')}
      >
        <Text style={styles.createButtonText}>
          Create survey
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSub,
    marginTop: 4,
  },
  createButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: 16,
  },
})