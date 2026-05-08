import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {images} from "@/constants";
import {useCartStore} from "@/store/cart.store";
import {router} from "expo-router";

const CartButton = () => {
    // nombre d’articles dans le panier
    const { getTotalItems } = useCartStore();
    const totalItems = getTotalItems();

    return (
        <TouchableOpacity className="cart-btn" onPress={() => router.push('/cart')}>
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