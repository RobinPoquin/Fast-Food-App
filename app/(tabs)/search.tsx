import {FlatList, Text, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from "@/lib/useAppwrite";
import {getCategories, getMenu} from "@/lib/appwrite";
import {useLocalSearchParams} from "expo-router";
import {useEffect} from "react";
import CartButton from "@/components/CartButton";
import cn from "clsx";
import MenuCard from "@/components/MenuCard";
import {Category, MenuItem} from "@/type";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";

const Search = () => {

    // récupère les paramètres présents dans l’URL
    const { category, query} = useLocalSearchParams<{query: string; category: string}>()

    // récupère les menus selon la catégorie et la recherche
    const { data, refetch, loading } = useAppwrite({
        fn: getMenu,
        params: {
            category,
            query,
            limit: 6, // limite le nombre de résultats affichés
        }
    });

    // récupère toutes les catégories disponibles
    const { data: categories} = useAppwrite({fn: getCategories});

    useEffect(() => {

        // recharge les menus quand la recherche ou la catégorie change
        refetch({ category, query, limit: 6 })

    }, [category, query]);

    return (
        // zone sécurisée de l’écran
        <SafeAreaView className="bg-white h-full">
            <FlatList
                // liste des menus à afficher
                data={data}

                renderItem={({ item, index }) => {

                    // permet d’ajouter un décalage visuel une carte sur deux
                    const isFirstRightColItem = index % 2 === 0;

                    return(
                        <View className={cn("flex-1 max-w-[48%]", !isFirstRightColItem ? 'mt-10' : 'mt-0')}>
                            <MenuCard item={item as unknown as MenuItem} />
                        </View>
                    )
                }}
                keyExtractor={item => item.$id} // utilise l’id du menu comme clé unique
                numColumns={2} // affiche les éléments sur 2 colonnes
                columnWrapperClassName="gap-7" // espace entre les colonnes
                contentContainerClassName="gap-7 px-5 pb-32" // espace intérieur de la liste
                ListHeaderComponent={() => (
                    <View className="my-5 gap-5">

                        {/* barre du haut */}
                        <View className="flex-between flex-row w-full">

                            <View className="flex-start">
                                <Text className="small-bold uppercase text-primary">
                                    Recherche
                                </Text>

                                <View className="flex-start flex-row gap-x-1 mt-0.5">
                                    <Text className="paragraph-semibold text-dark-100">
                                        Trouvez votre bonheur
                                    </Text>
                                </View>
                            </View>

                            {/* bouton du panier */}
                            <CartButton />
                        </View>

                        {/* futur champ de recherche */}
                        <SearchBar />

                        {/* futur système de filtres */}
                        <Filter categories={categories as unknown as Category[]}/>
                    </View>
                )}

                ListEmptyComponent={() => !loading && <Text>Aucun résultat</Text>}
            />
        </SafeAreaView>
    )
}

export default Search