import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {images} from "@/constants";

const CartButton = () => {
    const totalItems = 10; // nombre d’articles dans le panier (à rendre dynamique plus tard)

    return (
        <TouchableOpacity className="cart-btn" onPress={() => {}}>
            {/* Icône du panier */}
            <Image
                source={images.bag}
                className="size-5"
                resizeMode="contain" // garde les proportions de l’image
            />

            {/* Affiche le badge uniquement s'il y a des articles */}
            {totalItems > 0 && (
                <View className="cart-badge">
                    {/* Nombre d’articles affiché dans le badge */}
                    <Text className="small-bold text-white">{totalItems}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default CartButton