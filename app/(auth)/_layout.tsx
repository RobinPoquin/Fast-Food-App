import {View, Text} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context" // permet d’éviter les zones “coupées” (notch, etc.)
import {Slot} from "expo-router" // sert à afficher les pages enfants dans ce layout

export default function _Layout() {
    return (
        <SafeAreaView> {/* zone sécurisée pour éviter que le contenu soit masqué */}
            <Text>Auth_Layout</Text>
            <Slot /> {/* ici seront injectées les pages liées à l'auth */}
        </SafeAreaView>
    )
}