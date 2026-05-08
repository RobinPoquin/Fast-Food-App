import {View, Text, TouchableOpacity, Image, Platform} from 'react-native'
import {MenuItem} from "@/type";
import {appwriteConfig} from "@/lib/appwrite";
import {useCartStore} from "@/store/cart.store";

const MenuCard = ({ item: { $id, image_url, name, price}} : { item: MenuItem}) => {

    const { addItem } = useCartStore();

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
            <TouchableOpacity onPress={() => addItem({id: $id, name, price, image_url: image_url, customizations: []})}>
                <Text className="paragraph-bold text-primary">
                    Ajouter au Panier
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default MenuCard