import { View, ActivityIndicator } from "react-native"
import React from "react"
import { styles } from "../../../styles/globalStyles"

const LoaderAtom = () => {
  return (
    <View style={styles.fullScreen}>
      <ActivityIndicator size={200} color="#00ff00" />
    </View>
  )
}

export default LoaderAtom
