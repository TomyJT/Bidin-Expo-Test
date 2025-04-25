import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

const commonScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#4A90E2',
  tabBarInactiveTintColor: '#aaa',
  tabBarHideOnKeyboard: true,
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={commonScreenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus-circle" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="result"
        options={{
          title: 'Results',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="check-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}