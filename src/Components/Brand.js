import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { useTheme } from '@/Theme'

const Brand = ({ height = 200, width = 200, mode = 'contain' }) => {
  const { Layout, Images } = useTheme()

  return (
    <View style={{ height, width }}>
      <Image style={Layout.fullSize} source={Images.logo} resizeMode={mode} />
    </View>
  )
}

Brand.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  mode: PropTypes.string,
}

export default Brand
