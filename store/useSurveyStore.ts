import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple' | 'rating';
  options?: string[];
}

export interface Answer {
  questionId: string;
  response: string;
}

export interface Survey {
  id: string;
  title: string;
  questions: Question[];
  responses: Answer[][];
}

interface SurveyStore {
  surveys: Survey[];
  addSurvey: (title: string, questions: Question[]) => void;
  submitResponse: (surveyId: string, answers: Record<string, string>) => void;
  getSurveyById: (id: string) => Survey | undefined;
}

export const useSurveyStore = create<SurveyStore>((set, get) => ({
  surveys: [
    {
      id: '1',
      title: 'Coffee feedback',
      questions: [
        {
          id: 'q1',
          text: 'How would you rate the taste?',
          type: 'rating',
        },
        {
          id: 'q2',
          text: 'Would you recommend it?',
          type: 'multiple',
          options: ['Yes', 'No'],
        },
      ],
      responses: [],
    },
    {
      id: '2',
      title: 'Today´s mood',
      questions: [
        {
          id: 'q1',
          text: 'How are you feeling today?',
          type: 'multiple',
          options: ['Happy', 'Sad'],
        },
        {
          id: 'q2',
          text: 'Is there something you want to share??',
          type: 'text',
        },
      ],
      responses: [],
    },
  ],
  addSurvey: (title, questions) => {
    const newSurvey: Survey = {
      id: uuidv4(),
      title,
      questions,
      responses: [],
    }
    set((state) => ({
      surveys: [...state.surveys, newSurvey],
    }))
  },
  submitResponse: (surveyId, answers) => {
    set((state) => ({
      surveys: state.surveys.map((survey) =>
        survey.id === surveyId
          ? {
              ...survey,
              responses: [
                ...survey.responses,
                Object.entries(answers).map(([questionId, response]) => ({
                  questionId,
                  response,
                })),
              ],
            }
          : survey
      ),
    }))
  },
  getSurveyById: (id) => get().surveys.find((s) => s.id === id),
}))
