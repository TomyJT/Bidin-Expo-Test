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

  const activeSurveys = surveys.filter((survey) => survey.responses.length === 0)

  const renderItem = ({ item }: { item: Survey }) => (
    <SurveyCard
      title={item.title}
      subtitle={item.questions.length === 1
        ? `${item.questions.length} question`
        : `${item.questions.length} questions`
      }
      onPress={() => router.push(`/survey/${item.id}`)}
    />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active surveys</Text>
      <FlatList
        data={activeSurveys}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        ListEmptyComponent={(
          <View style={styles.emptyState}>
            <Text style={[styles.title, { fontSize: 18 }]}>
              No active surveys
            </Text>
          </View>
        )}
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
    backgroundColor: colors.bg,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginVertical: 16,
  },
  emptyState: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    marginTop: 16,
    backgroundColor: colors.secondary,
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
