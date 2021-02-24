import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTheme } from '@/Theme'
import { useDispatch } from 'react-redux'
import InitStartup from '@/Store/Startup/Init'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'

const IndexStartupContainer = () => {
  const { Layout, Gutters, Fonts } = useTheme()
<<<<<<< HEAD
  const { t } = useTranslation()
=======

  const { t } = useTranslation()

>>>>>>> 3358100dd1e25d1f91490fcb0d3ef6ad0f1b8088
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(InitStartup.action())
  }, [dispatch])

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size="large" style={[Gutters.largeVMargin]} />
      <Text style={Fonts.textCenter}>{t('welcome')}</Text>
    </View>
  )
}

export default IndexStartupContainer
