import React from 'react'
import {Redirect, Slot, Tabs} from "expo-router"; // permet de rediriger ou afficher les écrans enfants
import useAuthStore from "@/store/auth.store";
import {TabBarIconProps} from "@/type";
import {Image, Text, View} from "react-native";
import {images} from "@/constants";
import cn from "clsx"; // store global pour gérer l'authentification

// Composant qui affiche une icône + texte dans la barre de navigation
const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
    // conteneur de l'icône
    <View className="tab-icon">
        <Image
            source={icon}
            className="size-7"
            resizeMode="contain"
            tintColor={focused ? '#FE8C00' : '#5D5F6D'} // change la couleur si actif
        />
        <Text className={cn('text-sm font-bold', focused ? 'text-primary' : 'text-gray-200')}>
            {title}
        </Text>
    </View>
)

export default function TabLayout() {
    const { isAuthenticated } = useAuthStore(); // récupère l'état de connexion

    if (!isAuthenticated) return <Redirect href="/sign-in" /> // redirige vers login si non connecté

    return (
        <Tabs
            screenOptions={{
                headerShown: false, // cache le header en haut
                tabBarShowLabel: false, // enlève les noms  par défaut
                tabBarStyle: {
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    marginHorizontal: 20,
                    height: 80,
                    position: 'absolute',
                    bottom: 40,
                    backgroundColor: 'white',
                    shadowColor: '#1a1a1a',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 5,
                }
            }}
        >
            <Tabs.Screen
                name='index' // écran d'accueil
                options={{
                    title: 'Acceuil',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon title="Acceuil" icon={images.home} focused={focused} />
                    )
                }}
            />
            <Tabs.Screen
                name='search' // écran de recherche
                options={{
                    title: 'Recherche',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon title="Recherche" icon={images.search} focused={focused} />
                    )
                }}
            />
            <Tabs.Screen
                name='cart' // écran panier
                options={{
                    title: 'Panier',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon title="Panier" icon={images.bag} focused={focused} />
                    )
                }}
            />
            <Tabs.Screen
                name='profile' // écran profil utilisateur
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon title="Profile" icon={images.person} focused={focused} />
                    )
                }}
            />
        </Tabs>
    )
}