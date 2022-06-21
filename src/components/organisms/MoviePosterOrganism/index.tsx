import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import React from "react"
import { Movie } from "../../../interfaces/movies"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../../navigations";

interface Props {
  movie: Movie
  height?: number
  width?: number
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export const MoviePosterOrganism = ({
  movie,
  height = 420,
  width = 300
}: Props) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>()
  const uri = `https://image.tmdb.org/t/p/original${movie.poster_path}`
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("Details", movie)}
      style={{
        width,
        height,
        marginHorizontal: 8
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri
          }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10
  },
  image: {
    flex: 1,
    borderRadius: 18
  }
})
