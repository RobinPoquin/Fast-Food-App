import {View, Text, FlatList, TouchableOpacity, Platform} from 'react-native'
import React, {useState} from 'react'
import {Category} from "@/type";
import {router, useLocalSearchParams} from "expo-router";
import cn from "clsx";

const Filter = ({ categories } : { categories: Category[]}) => {

    // récupère les paramètres présents dans l’URL
    const searchParams = useLocalSearchParams();

    // stocke le filtre actuellement sélectionné
    const [active, setActive] = useState(searchParams.category || '');

    const handlePress = (id: string): void => {

        // met à jour le filtre actif visuellement
        setActive(id);

        // enlève le filtre si "Tout" est sélectionné
        if (id === 'all') router.setParams({ category: undefined });

        // ajoute la catégorie dans l’URL
        else router.setParams({ category: id });
    }

    // ajoute une catégorie "Tout" avant les autres catégories
    const filterData: (Category | { $id: string; name: string })[] = categories
        ? [{ $id: 'all', name: 'Tout' }, ...categories]
        : [{ $id: 'all', name: 'Tout'}]

    return (
        <FlatList
            data={filterData} // liste des filtres affichés
            keyExtractor={(item) => item.$id} // clé unique pour chaque filtre
            horizontal // affiche les filtres sur une ligne horizontale
            showsHorizontalScrollIndicator={false} // cache la barre de scroll horizontale
            contentContainerClassName="gap-x-2 pb-3" // espace entre les filtres
            renderItem={({ item }) => (
                <TouchableOpacity
                    key={item.$id}

                    // change la couleur du filtre actif
                    className={cn(
                        'filter',
                        active === item.$id ? 'bg-amber-500' : 'bg-white'
                    )}

                    // ajoute une ombre sur Android
                    style={Platform.OS === 'android'
                        ? { elevation: 5, shadowColor: '#878787'}
                        : {}
                    }

                    onPress={() => handlePress(item.$id)} // active le filtre au clic
                >
                    <Text
                        className={cn(
                            'body-medium',
                            active === item.$id ? 'text-white' : 'text-gray-200'
                        )}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )}
        />
    )
}

export default Filter