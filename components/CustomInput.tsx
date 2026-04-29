import {View, Text, TextInput} from 'react-native'
import React, {useState} from 'react'
import cn from "clsx"; // permet de gérer facilement les classes conditionnelles

const CustomInput = ({
                         placeholder = 'Rentrez texte', // texte affiché quand le champ est vide
                         value,
                         onChangeText,
                         label,
                         secureTextEntry = false, // permet de masquer le texte (mot de passe)
                         keyboardType = 'default' // type de clavier affiché
                     }: CustomInputProps) => {
    const [isFocused, setIsFocused] = useState(false) // indique si le champ est sélectionné

    return (
        <View className="w-full"> {/* conteneur du champ */}
            <Text className="label">{label}</Text> {/* affiche le label au-dessus */}

            <TextInput
                autoCapitalize='none' // empêche les majuscules automatiques
                autoCorrect={false} // désactive la correction automatique
                value={value} // valeur actuelle du champ
                onChangeText={onChangeText} // met à jour la valeur à chaque saisie
                secureTextEntry={secureTextEntry} // masque le texte si nécessaire
                keyboardType={keyboardType} // définit le type de clavier
                onFocus={() => setIsFocused(true)} // active le style focus
                onBlur={() => setIsFocused(false)} // enlève le style focus
                placeholder={placeholder} // texte affiché quand vide
                placeholderTextColor="#888" // couleur du placeholder
                className={cn('input', isFocused ? 'border-primary' : 'border-gray-300')} // change la bordure selon le focus
            />
        </View>
    )
}
export default CustomInput