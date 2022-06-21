import { StyleSheet, Text, View, Button, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../../../navigations";
import { useMovieDetails } from "../../../hooks/useMovieDetails";
import LoaderAtom from "../../atoms/LoaderAtom";
import { MovieDetails } from "../../organisms";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Details">;
interface Props extends StackScreenProps<RootStackParamList, any>{}
const windowHeight = Dimensions.get('window').height
export const DetailsPage = ({ route }: Props ) => {
  const movie = route.params
  const { cast, isLoading, movieFull } = useMovieDetails(movie!.id)
  const uri = `https://image.tmdb.org/t/p/original${movie!.poster_path}`
  const navigation = useNavigation<ProfileScreenNavigationProp>()
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri
          }}
          style={styles.posterImage}
        />
      </View>
      <View style={ styles.marginContainer }>
                <Text style={ styles.subTitle }>{ movie!.original_title }</Text>
                <Text style={ styles.title }>{ movie!.title }</Text>
            </View>
            {/* Boton para cerrar */}
            <View style={ styles.backButton }>
                <TouchableOpacity
                    onPress={() => navigation.pop() }
                >
                   <Text style={{ fontSize: 30 }}>{'<-'}</Text>
                </TouchableOpacity>
            </View>
            {
                isLoading 
                    ? <LoaderAtom />
                    : <MovieDetails movieFull={ movieFull! } cast={ cast! } />
            }
      <Button title="Navigate" onPress={() => navigation.navigate("Home")} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1, position: 'relative' },
  imageContainer: { 
    height: windowHeight * 0.7,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    marginBottom: 10
  },
  posterImage: {
    flex: 1
  },
  imageBorder: {
      flex: 1,
      overflow: 'hidden',
      borderBottomEndRadius: 25,
      borderBottomStartRadius: 25
  },
  marginContainer: {
      marginHorizontal: 20,
      marginTop: 20
  },
  subTitle: {
      fontSize: 16,
      opacity: 0.8
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold'
  },
  backButton: {
      position: 'absolute',
      backgroundColor: '#fff',
      borderRadius: 100,
      height: 50,
      width: 50,
      zIndex: 999,
      elevation: 9,
      top: 50,
      left: 5
  }
});