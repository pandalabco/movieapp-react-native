import React from 'react'
import { FlatList, Text, View } from 'react-native';
// import currencyFormatter from 'currency-formatter';
import { MovieFull } from '../../../interfaces/movieDetails';
import { Cast } from '../../../interfaces/cast';
import { CastItem } from '../CastItemOrganism';


interface Props {
    movieFull: MovieFull
    cast: Cast
}


export const MovieDetails = ({ movieFull, cast }: Props) => {
    return (
        <>
            {/* Detalles */}
            <View style={{ marginHorizontal: 20 }}>

                <View style={{ flexDirection: 'row' }}>

                    <Text> { movieFull.vote_average }</Text>

                    <Text style={{ marginLeft: 5 }}>
                         - { movieFull.genres.map( g => g.name ).join(', ') }
                    </Text>

                </View>

                {/* Historia */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Historia
                </Text>

                <Text style={{ fontSize: 16 }}>
                    { movieFull.overview }
                </Text>

                {/* Historia */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                    Presupuesto
                </Text>
                <Text style={{ fontSize: 18 }}>
                    { `currencyFormatter.format( ${movieFull.budget}, { code:'USD' }) `}
                </Text>
                

            </View>

            {/* Casting */}
            <View style={{ marginTop: 10, marginBottom: 100   }}>
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20}}>
                    Actores
                </Text>

                <FlatList 
                    data={ cast }
                    keyExtractor={ (item, index ) => item.id.toString() + index }
                    renderItem={ ({ item }: any) => <CastItem actor={ item } /> }
                    horizontal={ true }
                    showsHorizontalScrollIndicator={ false }
                    style={{ marginTop: 10, height: 70 }}
                />
                

            </View>

        </>
    )
}
