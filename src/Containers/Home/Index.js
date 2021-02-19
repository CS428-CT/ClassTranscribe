import React from 'react'
import { View, Text } from 'react-native'
import { Brand } from '@/Components'
import { useTheme } from '@/Theme'

const HomeContainer = () => {
  const { Gutters, Layout } = useTheme()

  return (
    <View style={[Layout.fill, Layout.colCenter, Gutters.smallHPadding]}>
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand />
        <Text>Home screen</Text>
      </View>
    </View>
  )
}

export default HomeContainer
