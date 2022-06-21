import { FlatList, View, Text } from "react-native"
import React from "react"
import { Movie } from "../../../interfaces/movies"
import { MoviePosterOrganism } from "../../organisms"
import { styles } from "../../../styles/globalStyles"

interface Props {
  movies: Movie[]
  title?: string
}

export const MovieSliderOrganism = ({ title, movies }: Props) => {
  return (
    <View style={{ ...styles.moviesSlider, height: title ? 260 : 220 }}>
      {title &&
        <Text style={styles.moviesSliderTitle}>
          {title}
        </Text>}

      <FlatList
        data={movies}
        renderItem={({ item }: any) =>
          <MoviePosterOrganism movie={item} height={200} width={140} />}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
