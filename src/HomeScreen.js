import React, {useEffect, useState} from 'react'
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView, Alert
} from "react-native";
import Header from "./components/Header";

import axios from "axios";

const HomeScreen = ({navigation}) => {

    const [drink, setDrinks] = useState([])

    const [text, onChangeText] = React.useState("");

    const [search, setSearch] = useState([])

    const getDrinks = async () => {
        try {
            const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
            setDrinks(response.data.drinks)
        } catch (e) {
            console.log(e)
            Alert.alert("Ошибка", "" + e)
        }

    }

    const searchDrinks = async () => {
        try {
            const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + text)
            if (response.data.drinks) {
                setSearch(response.data.drinks)
            } else {
                setSearch([])
            }
        } catch (e) {
            console.log(e)
            Alert.alert("Ошибка", "" + e)
        }
    }

    useEffect(() => {
        getDrinks()
    }, [])

    useEffect(() => {
        searchDrinks()
    }, [text])

    return drink.length > 0 ? (
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <Header/>

                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                    />
                    {text !== '' && search.length > 0 ? (<View style={styles.list}>
                        {search.map(i => (
                            <TouchableOpacity key={i.idDrink} style={styles.card}
                                              onPress={() => navigation.navigate('FullInfo', i.idDrink)}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={{uri: i.strDrinkThumb}}
                                />
                                <Text style={styles.text}>{i.strDrink}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>) : null}

                    <View style={styles.list}>
                        {drink.map(i => (
                            <TouchableOpacity key={i.idDrink} style={styles.card}
                                              onPress={() => navigation.navigate('FullInfo', i.idDrink)}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={{uri: i.strDrinkThumb}}
                                />
                                <Text style={styles.text}>{i.strDrink}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>

                </SafeAreaView>
            </ScrollView>

        )
        :
        (
            <SafeAreaView style={styles.preloader}>
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    preloader: {
        flex: 1,
        justifyContent: "center"
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    card: {
        textAlign: 'center',
        width: '45%',
        paddingBottom: 15,
        marginBottom: 15
    },
    text: {
        textAlign: "center"
    },
    tinyLogo: {
        width: 80,
        height: 80,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 10,
        marginBottom: 15,
        resizeMode: 'contain',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

});

export default HomeScreen;