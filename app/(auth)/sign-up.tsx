import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router"; // navigation entre les pages
import CustomInput from "@/components/CustomInput"; // champ de saisie personnalisé
import CustomButton from "@/components/CustomButton"; // bouton avec état de chargement

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false) // indique si l'inscription est en cours
    const [form, setForm] = useState({ name: '', email: "", password: "" }) // stocke les infos du formulaire

    const submit = async () => {
        // vérifie que tous les champs sont remplis
        if(!form.name || !form.email || !form.password) return  Alert.alert('Erreur', 'Veuillez rentré une adresse mail & mot de passe valide')

        setIsSubmitting(true) // active le loading

        try {
            //Appel Appwrite (création du compte)

            Alert.alert('Succès', 'Utilisateur connecté'); // message de succès
            router.replace('/') // redirige vers l'accueil
        } catch (error:any) {
            Alert.alert('Erreur', error.message); // affiche une erreur si problème
        } finally {
            setIsSubmitting(false) // désactive le loading dans tous les cas
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5"> {/* conteneur principal du formulaire */}
            <CustomInput
                placeholder="Entrez votre nom complet" // texte affiché dans le champ
                value={form.name} // valeur actuelle du nom
                onChangeText={(text) => setForm((prev)=> ({ ...prev, name: text }) )} // met à jour le nom
                label="Nom complet" // label du champ
            />
            <CustomInput
                placeholder="Entrez votre email" // texte affiché dans le champ
                value={form.email} // valeur actuelle de l'email
                onChangeText={(text) => setForm((prev)=> ({ ...prev, email: text }) )} // met à jour l'email
                label="Email" // label du champ
                keyboardType="email-address" // clavier adapté pour email
            />
            <CustomInput
                placeholder="Entrez votre mot de passe" // texte affiché dans le champ
                value={form.password} // valeur actuelle du mot de passe
                onChangeText={(text) => setForm((prev)=> ({ ...prev, password: text }) )} // met à jour le mot de passe
                label="Mot de passe" // label du champ
                secureTextEntry={true} // masque le texte
            />
            <CustomButton
                title="Créer un compte" // texte du bouton
                isLoading={isSubmitting} // affiche un loading si en cours
                onPress={submit} // lance la fonction submit
            />

            <View className="flex justify-center mt-5 flex-row gap-2"> {/* zone lien vers connexion */}
                <Text className="base-regular text-gray-100">
                    Vous avez un compte ?
                </Text>
                <Link href="/sign-in" className="base-bold text-primary"> {/* lien vers la page login */}
                    Connexion
                </Link>
            </View>
        </View>
    )
}
export default SignUp