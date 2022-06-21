import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import Navigation from "./src/navigations"
import { GradientProvider } from "./src/store/gradient.context"

const AppState = ({ children }: any) =>
  <GradientProvider>
    {children}
  </GradientProvider>

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
    </NavigationContainer>
  )
}

export default App
