import {View, KeyboardAvoidingView, Platform, ScrollView, Dimensions, ImageBackground, Image} from 'react-native'
import React from 'react'
import {Redirect, Slot} from "expo-router" // permet d'afficher les écrans enfants dans ce layout
import {images} from "@/constants";
import useAuthStore from "@/store/auth.store";


export default function _Layout() {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) return <Redirect href="/" /> // Redirige vers la HomePage si déjà connecté

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height' }> {/* évite que le clavier cache les inputs */}
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled"> {/* permet de scroller et gérer les clics avec le clavier ouvert */}
                <View className="w-full relative" style={{ height: Dimensions.get('screen').height / 2.25 }}> {/* bloc du haut avec une hauteur dynamique */}
                    <ImageBackground source={images.loginGraphic} className="size-full rounded-b-lg" resizeMode="stretch" /> {/* image de fond du header */}
                    <Image source={images.logo} className="self-center size-48 absolute -bottom-16 z-10" /> {/* logo placé au centre et qui déborde vers le bas */}
                </View>
                <Slot /> {/* ici s'affichent les écrans enfants */}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}