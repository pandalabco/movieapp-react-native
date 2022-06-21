import * as React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomePage, DetailsPage } from "../components/pages"
import { Branding } from "../constants"
import { Movie } from "../interfaces/movies"

export type RootStackParamList = {
  Home: undefined
  Details: Movie
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Branding.backgroundColor
        }
      }}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Details" component={DetailsPage} />
    </Stack.Navigator>
  )
}

export default Navigation
