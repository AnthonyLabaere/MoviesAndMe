import React from 'react';
import { Button, FlatList, TextInput, StyleSheet, View, ActivityIndicator } from 'react-native';
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.page = 0 // Compteur pour connaître la page courante
        this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
        this.state = { films: [], isLoading: false }
        this.searchedText = ""
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: []
        }, () => {
            this._loadFilms()
        })
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                console.log(data)
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                  films: [ ...this.state.films, ...data.results ],
                  isLoading: false
                })
            })
            this.setState({ isLoading: false })
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
              {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
            </View>
          )
        }
    }

    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={() => this._searchFilms()} style={styles.textinput} placeholder='Titre du film' onChangeText={(text => this.searchedText = text)}></TextInput>
                <Button style={{height: 50}} title='Recherche' onPress={() => this._searchFilms()}></Button>
                <FlatList 
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                    data={this.state.films}
                    extraData={this.props.favoritesFilm}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (<FilmItem film={item} isFilmFavorite={this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1} displayDetailForFilm={this._displayDetailForFilm} />)}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
}) 

const mapStateToProps = (state) => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }
  
  export default connect(mapStateToProps)(Search)