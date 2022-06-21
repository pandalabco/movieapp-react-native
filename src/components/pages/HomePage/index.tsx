import { Dimensions, View, ScrollView, SafeAreaView } from "react-native"
import React, { useContext, useEffect } from "react"
import { useMovies } from "../../../hooks/useMovies"
import { styles } from "../../../styles/globalStyles"
import LoaderAtom from "../../atoms/LoaderAtom"
import { MoviePosterOrganism, MovieSliderOrganism } from "../../organisms"
import Carousel from "react-native-snap-carousel"
import { GradientColorOrganism } from "../../organisms/GradientColorOrganism"
import { GradientContext } from "../../../store/gradient.context"
import { getImageColors } from "../../../utils/getColores"

export const HomePage = () => {
  const { movies, nowPlaying, popular, upcoming, isLoading } = useMovies()
  const { setMainColors } = useContext(GradientContext)
  const { width: windowWidth } = Dimensions.get("window")

  const getPosterColors = async (index: number) => {
    const movie = movies[index]
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const [primary = "green", secondary = "orange"] = await getImageColors(uri)
    console.log(
      "🚀 ~ file: index.tsx ~ line 22 ~ getPosterColors ~ primary, secondary",
      primary,
      secondary
    )
    setMainColors({ primary, secondary })
  }

  useEffect(
    () => {
      if (movies.length > 0) {
        getPosterColors(0)
      }
    },
    [movies]
  )
  if (isLoading) return <LoaderAtom />

  return (
    <GradientColorOrganism>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.fullScreen}>
            {/* Carusel principal */}
            <View style={{ height: 440, marginTop: 5 }}>
              <Carousel
                data={movies}
                renderItem={({ item }: any) =>
                  <MoviePosterOrganism movie={item} />}
                sliderWidth={windowWidth}
                itemWidth={300}
                layoutCardOffset={18}
                inactiveSlideOpacity={0.9}
                onSnapToItem={index => getPosterColors(index)}
              />
            </View>
            {/* Carusel Secundario */}
            <MovieSliderOrganism title="Ahora en cines" movies={nowPlaying} />
            <MovieSliderOrganism title="Tendencia" movies={movies} />
            <MovieSliderOrganism title="Popular" movies={popular} />
            <MovieSliderOrganism title="Proximamente" movies={upcoming} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientColorOrganism>
  )
}
