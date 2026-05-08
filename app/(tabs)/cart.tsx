import {View, Text, FlatList} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {useCartStore} from "@/store/cart.store";
import CustomHeader from "@/components/CustomHeader";
import {PaymentInfoStripeProps} from "@/type";
import cn from "clsx";
import CustomButton from "@/components/CustomButton";
import CartItem from "@/components/CartItem";

// composant utilisé pour afficher une ligne de prix dans la facture
const PaymentInfoStripe = ({
                               label,
                               value,
                               labelStyle,
                               valueStyle,
                           }: PaymentInfoStripeProps) => (

    <View className="flex-between flex-row my-1">

        {/* texte à gauche */}
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>

        {/* valeur affichée à droite */}
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const Cart = () => {

    // récupère les données et fonctions du panier
    const { items, getTotalItems, getTotalPrice } = useCartStore();

    // nombre total d’articles
    const totalItems = getTotalItems();

    // prix total du panier
    const totalPrice = getTotalPrice();

    return (
        <SafeAreaView className="bg-white h-full">

            <FlatList
                // liste des produits du panier
                data={items}
                // affiche chaque produit
                renderItem={({item}) => <CartItem item={item}/>}
                // clé unique pour chaque produit
                keyExtractor={(item) => item.id}
                // espace intérieur de la liste
                contentContainerClassName="pb-28 px-5 pt-5"
                ListHeaderComponent={() => (
                    // titre affiché en haut de la page
                    <CustomHeader title="Votre Panier" />
                )}
                ListEmptyComponent={() => (
                    // affiché quand le panier est vide
                    <Text>Panier vide</Text>
                )}
                ListFooterComponent={() => totalItems > 0 && (

                    // affiché seulement si le panier contient des produits
                    <View className="gap-5">

                        {/* bloc de résumé de la facture */}
                        <View className="mt-6 border border-gray-200 p-5 rounded-2xl">

                            <Text className="h3-bold text-dark-100 mb-5">
                                Facture
                            </Text>

                            {/* prix total des articles */}
                            <PaymentInfoStripe
                                label={`Nombre d'articles (${totalItems})`}
                                value={`$${totalPrice.toFixed(2)}`}
                            />

                            {/* frais de livraison */}
                            <PaymentInfoStripe
                                label={`Frais de livraison`}
                                value={`5.00€`}
                            />

                            {/* réduction appliquée */}
                            <PaymentInfoStripe
                                label={`Reduction`}
                                value={`- 0.50€`}
                                valueStyle="!text-success"
                            />

                            {/* ligne de séparation */}
                            <View className="border-t border-gray-300 my-2"/>

                            {/* prix final */}
                            <PaymentInfoStripe
                                label={`Total`}
                                value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                                labelStyle="base-bold !text-dark-100"
                                valueStyle="base-bold !text-dark-100 !text-right"
                            />
                        </View>

                        {/* bouton de commande */}
                        <CustomButton title="Commender Maintenant" />
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Cart