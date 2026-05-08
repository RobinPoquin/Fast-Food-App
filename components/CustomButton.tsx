import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import cn from "clsx";
import {CustomButtonProps} from "@/type"; // permet de gérer les classes dynamiques facilement

const CustomButton = ({
                          onPress,
                          // texte affiché sur le bouton
                          title="Cliquez moi",
                          style,
                          textStyle,
                          leftIcon,
                          // indique si un chargement est en cours
                          isLoading = false,
                      }: CustomButtonProps) => {
    return (
        <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}>
            {/* icône affichée à gauche si fournie */}
            {leftIcon}
            {/* aligne le contenu du bouton */}
            <View className="flex-center flex-row">
                {isLoading ? (
                    // affiche un loader si en cours
                    <ActivityIndicator size="small" color="white" />
                ): (
                    <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>
                        {title}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton