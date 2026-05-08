import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import React, {useCallback, useState} from 'react'
import {router, useLocalSearchParams} from "expo-router";
import {images} from "@/constants";
import {useDebouncedCallback} from "use-debounce";

const SearchBar = () => {

    // récupère la recherche actuelle présente dans l’URL
    const params = useLocalSearchParams<{ query: string}>()

    // stocke le texte tapé dans la barre de recherche
    const [query, setQuery] = useState(params.query)

    const handleSeach = (text: string) => {

        // met à jour le texte affiché dans l’input
        setQuery(text)

        // enlève le paramètre de recherche si le champ est vide
        if (!text) router.setParams({ query });
    }

    const handleSubmit = () => {

        // lance la recherche seulement si du texte est présent
        if (query?.trim()) router.setParams({ query });
    }

    return (
        <View className="searchbar"> {/* conteneur principal de la barre de recherche */}

            <TextInput
                className="flex-1 p-5"
                placeholder="Vous cherchez quelque chose ?" // texte affiché quand vide
                value={query} // valeur actuelle de l’input
                onChangeText={handleSeach} // appelé à chaque changement de texte
                onSubmitEditing={handleSubmit} // appelé quand l’utilisateur valide
                placeholderTextColor="#A0A0A0" // couleur du placeholder
                returnKeyType="search" // affiche un bouton "recherche" sur le clavier
            />

            <TouchableOpacity
                className="pr-5"

                // lance la recherche au clic sur l’icône
                onPress={() => router.setParams({ query })}
            >
                <Image
                    source={images.search} // icône de recherche
                    className="size-6"
                    resizeMode="contain"
                    tintColor="#5D5F6D"
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar