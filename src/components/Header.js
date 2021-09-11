import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default function Header(props) {

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.title?props.title: 'Drinks'}</Text>
        </View>
    );
};



const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        backgroundColor: 'cadetblue',
        marginBottom:15
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
    },
})