import {View, Text, TouchableOpacity, Image, Platform} from 'react-native'
import {MenuItem} from "@/type";
import {appwriteConfig} from "@/lib/appwrite";

const MenuCard = ({ item: {image_url, name, price}} : { item: MenuItem}) => {

    // ajoute l’ID du projet dans l’URL de l’image Appwrite
    const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`

    return (
        <TouchableOpacity

            // applique une ombre spéciale sur Android
            className="menu-card"
            style={Platform.OS === 'android'
                ? { elevation: 10, shadowColor: '#878787'}
                : {}
            }
        >

            {/* image du produit affichée au-dessus de la carte */}
            <Image
                source={{ uri: image_url }}
                className="size-32 absolute -top-10"
                resizeMode="contain"
            />

            {/* nom du menu */}
            <Text
                className="text-center base-bold text-dark-100 mb-2"
                numberOfLines={2} // limite le texte à 2 lignes
            >
                {name}
            </Text>

            {/* prix du produit */}
            <Text className="body-regular text-gray-200 mb-4">
                Prix : {price}
            </Text>

            {/* bouton d’ajout au panier */}
            <TouchableOpacity onPress={() => {}}>
                <Text className="paragraph-bold text-primary">
                    Ajouter au Panier
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default MenuCard