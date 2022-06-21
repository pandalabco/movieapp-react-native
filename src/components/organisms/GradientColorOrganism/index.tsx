import { StyleSheet, View, Animated } from "react-native"
import React, { useContext, useEffect } from "react"
import LinearGradient from "react-native-linear-gradient"
import { GradientContext } from "../../../store/gradient.context"
import { useFade } from "../../../hooks/useFade"

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const GradientColorOrganism = ({ children }: Props) => {
  const { colors, prevColors, setPrevMainColors } = useContext(GradientContext)

  const { opacity, fadeIn, fadeOut } = useFade()

  useEffect(
    () => {
      fadeIn(() => {
        setPrevMainColors(colors)
        fadeOut(0)
      })
    },
    [colors]
  )
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <LinearGradient
        colors={[prevColors.primary, prevColors.secondary, "white"]}
        style={{ ...StyleSheet.absoluteFillObject }}
        start={{ x: 0.1, y: 0.1 }}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity
        }}
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary, "white"]}
          style={{ ...StyleSheet.absoluteFillObject }}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.5, y: 0.7 }}
        />
      </Animated.View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({})
