import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
import dummyData from "./data";

// Définition d'une catégorie (ex: Burger, Pizza…)
interface Category {
    name: string; // nom de la catégorie
    description: string; // description affichée
}

// Définition d'une option personnalisable (ex: supplément fromage)
interface Customization {
    name: string; // nom de l'option
    price: number; // prix ajouté
    type: "topping" | "side" | "size" | "crust" | string; // type d'option
}

// Définition d'un élément du menu
interface MenuItem {
    name: string; // nom du plat
    description: string; // description du plat
    image_url: string; // image d'origine (avant upload)
    price: number; // prix
    rating: number; // note utilisateur
    calories: number; // calories
    proteines: number; // protéines
    category_name: string; // nom de la catégorie associée
    customizations: string[]; // liste des options disponibles
}

// Structure globale des données
interface DummyData {
    categories: Category[]; // liste des catégories
    customizations: Customization[]; // liste des options
    menu: MenuItem[]; // liste des plats
}

// Force le typage des données importées
const data = dummyData as DummyData;

// Supprime tous les documents d'une collection donnée
async function clearAll(collectionId: string): Promise<void> {
    const list = await databases.listDocuments(
        appwriteConfig.databaseId,
        collectionId
    );

    await Promise.all(
        list.documents.map((doc) =>
            databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id) // supprime chaque document
        )
    );
}

// Supprime tous les fichiers stockés (images, etc.)
async function clearStorage(): Promise<void> {
    const list = await storage.listFiles(appwriteConfig.bucketId);

    await Promise.all(
        list.files.map((file) =>
            storage.deleteFile(appwriteConfig.bucketId, file.$id) // supprime chaque fichier
        )
    );
}

// Télécharge une image depuis une URL et la stocke dans Appwrite
async function uploadImageToStorage(imageUrl: string) {
    const response = await fetch(imageUrl); // récupère l'image
    const blob = await response.blob(); // transforme en fichier

    const fileObj = {
        name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`, // nom du fichier
        type: blob.type, // type (jpg, png…)
        size: blob.size, // taille
        uri: imageUrl, // source
    };

    const file = await storage.createFile(
        appwriteConfig.bucketId,
        ID.unique(),
        fileObj // upload du fichier
    );

    return storage.getFileViewURL(appwriteConfig.bucketId, file.$id); // retourne l'URL accessible
}

// Fonction principale qui remplit la base de données
async function seed(): Promise<void> {
    // 1. Nettoie toutes les données existantes
    await clearAll(appwriteConfig.categoriesCollectionId);
    await clearAll(appwriteConfig.customizationCollectionId);
    await clearAll(appwriteConfig.menuCollectionID);
    await clearAll(appwriteConfig.menuCustomizationCollectionID);
    await clearStorage();

    // 2. Crée les catégories
    const categoryMap: Record<string, string> = {};
    for (const cat of data.categories) {
        const doc = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
            ID.unique(),
            cat // enregistre la catégorie
        );
        categoryMap[cat.name] = doc.$id; // stocke l'id pour lien futur
    }

    // 3. Crée les options personnalisables
    const customizationMap: Record<string, string> = {};
    for (const cus of data.customizations) {
        const doc = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.customizationCollectionId,
            ID.unique(),
            {
                name: cus.name,
                price: cus.price,
                type: cus.type,
            }
        );
        customizationMap[cus.name] = doc.$id; // stocke l'id
    }

    // 4. Crée les plats du menu
    const menuMap: Record<string, string> = {};
    for (const item of data.menu) {
        const uploadedImage = await uploadImageToStorage(item.image_url); // upload image

        const doc = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionID,
            ID.unique(),
            {
                name: item.name,
                description: item.description,
                image_url: uploadedImage, // utilise l'image uploadée
                price: item.price,
                rating: item.rating,
                calories: item.calories,
                proteines: item.proteines,
                categories: categoryMap[item.category_name], // lien avec catégorie
            }
        );

        menuMap[item.name] = doc.$id; // stocke l'id du plat

        // 5. Associe les options au plat
        for (const cusName of item.customizations) {
            await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.menuCustomizationCollectionID,
                ID.unique(),
                {
                    menu: doc.$id, // lien vers le plat
                    customizations: customizationMap[cusName], // lien vers option
                }
            );
        }
    }

    console.log("Seeding terminé."); // message de fin
}

export default seed;