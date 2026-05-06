import {Account, Avatars, Client, Databases, ID, Query} from "react-native-appwrite";
import {CreateUserParams, SignInParams} from "@/type"; // SDK Appwrite pour gérer auth, DB, etc.

// Configuration de l'app Appwrite
export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!, // URL de ton serveur Appwrite
    platform: "com.robin.fastfoodapp", // identifiant de ton app mobile
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!, // ID du projet Appwrite
    databaseId: '69f22b330026e121d83f', // ID de la base de données
    bucketId : '69fb65900002c8067100',
    useCollectionId: 'user', // ID de la collection utilisateurs
    categoriesCollectionId: '69fb61ba0002d5e8a9a1', // ID de la collection des catégories
    menuCollectionID: '69fb625a0006d1213b8e', // ID de la collection des menus
    customizationCollectionId: '69fb6369002bad0e1f0d', // ID de la collection des customisations
    menuCustomizationCollectionID: '69fb649d0017e09a358c' // ID de la collection des liens menu / customisations
}

export const client = new Client(); // initialise le client Appwrite

client
    .setEndpoint(appwriteConfig.endpoint) // configure l'URL du serveur
    .setPlatform(appwriteConfig.platform) // configure la plateforme
    .setProject(appwriteConfig.projectId) // configure le projet

export const account = new Account(client); // gère les utilisateurs (auth)
export const databases = new Databases(client); // gère la base de données
const avatars = new Avatars(client); // permet de générer des avatars automatiquement

// Crée un nouvel utilisateur + l'enregistre en base
export const createUser = async ({email, password, name} : CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name); // crée le compte Appwrite
        if (!newAccount) throw Error; // vérifie que la création a réussi

        await signIn({ email, password }) // connecte automatiquement l'utilisateur
        const avatarUrl = avatars.getImageURL(name) // génère un avatar basé sur le nom

        return await databases.createDocument(
            appwriteConfig.databaseId, // base de données
            appwriteConfig.useCollectionId, // collection utilisateurs
            ID.unique(), // ID unique du document
            {
                accountId: newAccount.$id, // lie le document au compte Appwrite
                email, name, avatar: avatarUrl // données stockées
            }
        )

    } catch (e) {
        console.log('createUser ERREUR =>', e);
        throw new Error(e as string) // renvoie l'erreur
    }
}

// Connecte un utilisateur existant
export const signIn = async ({email, password} : SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password); // crée une session utilisateur
    } catch (e) {
        throw new Error(e as string); // renvoie l'erreur
    }
}

// Récupère les infos de l'utilisateur connecté
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get(); // récupère le compte connecté

        if (!currentAccount) throw Error; // vérifie qu'il existe

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId, // base de données
            appwriteConfig.useCollectionId, // collection utilisateurs
            [Query.equal('accountId', currentAccount.$id)] // filtre par ID du compte
        )

        if(!currentUser) throw Error; // vérifie que des données existent

        return currentUser.documents[0]; // retourne le premier utilisateur trouvé
    } catch (e: any) {
        if (e?.message?.includes('session is active')) return;
        throw new Error(e as string); // renvoie l'erreur
    }
}