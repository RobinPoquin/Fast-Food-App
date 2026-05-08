import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {images} from "@/constants";

const CartItem = ({ item }: { item: CartItemType }) => {

    // récupère les fonctions de gestion du panier
    const { increaseQty, decreaseQty, removeItem } = useCartStore();

    return (
        <View className="cart-item">

            <View className="flex flex-row items-center gap-x-3">

                {/* bloc de l’image du produit */}
                <View className="cart-item__image">

                    <Image
                        // image du produit
                        source={{ uri: item.image_url }}
                        className="size-4/5 rounded-lg"
                        resizeMode="cover"
                    />
                </View>

                <View>

                    {/* nom du produit */}
                    <Text className="base-bold text-dark-100">
                        {item.name}
                    </Text>

                    {/* prix du produit */}
                    <Text className="paragraph-bold text-primary mt-1">
                        ${item.price}
                    </Text>

                    {/* zone de gestion de la quantité */}
                    <View className="flex flex-row items-center gap-x-4 mt-2">

                        {/* bouton pour retirer une quantité */}
                        <TouchableOpacity
                            onPress={() => decreaseQty(item.id, item.customizations!)}
                            className="cart-item__actions"
                        >
                            <Image
                                source={images.minus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>

                        {/* quantité actuelle */}
                        <Text className="base-bold text-dark-100">
                            {item.quantity}
                        </Text>

                        {/* bouton pour ajouter une quantité */}
                        <TouchableOpacity
                            onPress={() => increaseQty(item.id, item.customizations!)}
                            className="cart-item__actions"
                        >
                            <Image
                                source={images.plus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* bouton pour supprimer complètement le produit */}
            <TouchableOpacity
                onPress={() => removeItem(item.id, item.customizations!)}
                className="flex-center"
            >
                <Image
                    source={images.trash}
                    className="size-5"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default CartItem;