import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router"; // navigation entre les pages
import CustomInput from "@/components/CustomInput"; // champ de saisie personnalisé
import CustomButton from "@/components/CustomButton"; // bouton personnalisé avec état loading

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false) // indique si la requête est en cours
    const [form, setForm] = useState({ email: "", password: "" }) // stocke les données du formulaire

    const submit = async () => {
        // vérifie que les champs ne sont pas vides
        if(!form.email || !form.password) return Alert.alert('Erreur', 'Veuillez rentré une adresse mail & mot de passe valide')

        setIsSubmitting(true) // active le loading

        try {
            //Appel Appwrite (connexion utilisateur)

            Alert.alert('Succès', 'Utilisateur connecté'); // message de succès
            router.replace('/') // redirige vers la page d'accueil
        } catch (error:any) {
            Alert.alert('Erreur', error.message); // affiche l'erreur si problème
        } finally {
            setIsSubmitting(false) // désactive le loading dans tous les cas
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5"> {/* conteneur principal du formulaire */}
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
                secureTextEntry={true} // masque le texte (mot de passe)
            />
            <CustomButton
                title="Connexion" // texte du bouton
                isLoading={isSubmitting} // affiche un loading si en cours
                onPress={submit} // lance la fonction submit au clic
            />

            <View className="flex justify-center mt-5 flex-row gap-2"> {/* zone du lien d'inscription */}
                <Text className="base-regular text-gray-100">
                    Vous n'avez pas de compte ?
                </Text>
                <Link href="/sign-up" className="base-bold text-primary"> {/* lien vers page d'inscription */}
                    Créer un compte
                </Link>
            </View>
        </View>
    )
}
export default SignIn