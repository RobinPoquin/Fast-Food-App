import {Button, FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {images, offers} from "@/constants";
import {Fragment} from "react";
import cn from "clsx";
import CartButton from "@/components/CartButton";
import useAuthStore from "@/store/auth.store";

export default function Index() {
    const { user } = useAuthStore();

    return (
        // Permet d'éviter que le contenu passe sous la barre du téléphone
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                data={offers} // liste des offres à afficher à l'écran

                renderItem={({ item, index }) => {
                    // Sert à alterner le sens d'affichage pour un rendu plus dynamique
                    const isEven = index % 2 === 0;

                    return (
                        <View>
                            <Pressable
                                // Inverse le sens (image / texte) une fois sur deux
                                className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
                                style={{ backgroundColor: item.color}} // applique la couleur de l'offre
                                android_ripple={{color: "#fffff22"}} // effet visuel au clic sur Android
                            >
                                {({}) => (
                                    <Fragment>

                                        {/* Partie image (gauche ou droite selon le cas) */}
                                        <View className={"h-full w-1/2"}>
                                            <Image
                                                source={item.image} // image liée à l'offre
                                                className={"size-full"}
                                                resizeMode={"contain"} // évite que l'image soit déformée
                                            />
                                        </View>

                                        {/* Partie texte + flèche */}
                                        <View className={cn("offer-card__info", isEven ? 'pl-10' : 'pr-10')}>
                                            <Text className={"h1-bold text-white leading-tight"}>
                                                {item.title} {/* titre de l'offre */}
                                            </Text>

                                            <Image
                                                source={images.arrowRight} // petite flèche visuelle
                                                className="size-10"
                                                resizeMode="contain"
                                                tintColor="#ffffff"
                                            />
                                        </View>

                                    </Fragment>
                                )}
                            </Pressable>
                        </View>
                    )
                }}

                // Ajoute de l'espace autour du contenu pour éviter que ça colle aux bords
                contentContainerClassName="pb-28 px-5"

                // Bloc affiché en haut de la liste
                ListHeaderComponent={() => (
                    <View className="flex-between flex-row w-full my-5">

                        {/* Zone indiquant la livraison */}
                        <View className="flex-start">
                            <Text className="small-bold text-primary">Livré en</Text>

                            <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                                <Text className="paragraph-bold text-dark-100">France</Text>
                                <Image
                                    source={images.arrowDown} // icône pour suggérer une sélection possible
                                    className="size-3"
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Bouton du panier */}
                        <CartButton />
                    </View>
                )}
            />
        </SafeAreaView>
    );
}