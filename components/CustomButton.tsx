import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import cn from "clsx"; // permet de gérer les classes dynamiques facilement

const CustomButton = ({
                          onPress,
                          title="Cliquez moi", // texte affiché sur le bouton
                          style,
                          textStyle,
                          leftIcon,
                          isLoading = false, // indique si un chargement est en cours
                      }: CustomButtonProps) => {
    return (
        <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}> {/* bouton cliquable avec styles personnalisables */}
            {leftIcon} {/* icône affichée à gauche si fournie */}

            <View className="flex-center flex-row"> {/* aligne le contenu du bouton */}
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" /> // affiche un loader si en cours
                ): (
                    <Text className={cn('text-white-100 paragraph-semibold', textStyle)}> {/* texte du bouton */}
                        {title}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton