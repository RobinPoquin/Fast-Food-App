import React from 'react'
import {Redirect, Slot} from "expo-router"; // permet de rediriger ou afficher les écrans enfants
import useAuthStore from "@/store/auth.store"; // store global pour gérer l'authentification

export default function TabLayout() {
    const { isAuthenticated } = useAuthStore(); // récupère l'état de connexion

    if (!isAuthenticated) return <Redirect href="/sign-in" /> // redirige vers login si non connecté

    return <Slot /> // affiche les pages enfants si l'utilisateur est connecté
}