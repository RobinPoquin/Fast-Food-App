import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { CustomHeaderProps } from "@/type";
import {images} from "@/constants";

const CustomHeader = ({ title }: CustomHeaderProps) => {

    // permet de gérer la navigation entre les pages
    const router = useRouter();

    return (
        <View className="custom-header">

            {/* bouton retour */}
            <TouchableOpacity onPress={() => router.back()}>

                <Image
                    // icône retour
                    source={images.arrowBack}
                    className="size-5"
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* affiche le titre seulement s’il existe */}
            {title && (
                <Text className="base-semibold text-dark-100">
                    {title}
                </Text>
            )}

            {/* icône de recherche affichée à droite */}
            <Image
                source={images.search}
                className="size-5"
                resizeMode="contain"
            />
        </View>
    );
};

export default CustomHeader;