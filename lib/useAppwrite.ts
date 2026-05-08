import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

// Options envoyées au hook
interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
    fn: (params: P) => Promise<T>; // fonction Appwrite à exécuter
    params?: P; // paramètres de départ
    skip?: boolean; // permet d'empêcher le chargement automatique
}

// Valeurs retournées par le hook
interface UseAppwriteReturn<T, P> {
    data: T | null; // données récupérées
    loading: boolean; // indique si une requête est en cours
    error: string | null; // message d'erreur éventuel
    refetch: (newParams?: P) => Promise<void>; // relance la requête
}

// Hook personnalisé pour simplifier les appels Appwrite
const useAppwrite = <T, P extends Record<string, string | number>>({
                                                                       fn,
                                                                       params = {} as P,
                                                                       skip = false,
                                                                   }: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {

    const [data, setData] = useState<T | null>(null); // stocke les données récupérées
    const [loading, setLoading] = useState(!skip); // active le loading au démarrage
    const [error, setError] = useState<string | null>(null); // stocke les erreurs

    // Fonction qui exécute l'appel Appwrite
    const fetchData = useCallback(
        async (fetchParams: P) => {
            setLoading(true); // active le loading
            setError(null); // réinitialise les erreurs

            try {
                const result = await fn({ ...fetchParams }); // exécute la fonction demandée
                setData(result); // sauvegarde les données reçues
            } catch (err: unknown) {

                // Récupère un message d'erreur propre
                const errorMessage =
                    err instanceof Error ? err.message : "Une erreur inconnue est survenue";

                setError(errorMessage); // stocke l'erreur
                Alert.alert("Erreur", errorMessage); // affiche une popup
            } finally {
                setLoading(false); // désactive le loading
            }
        },
        [fn]
    );

    // Lance automatiquement la requête au chargement du composant
    useEffect(() => {
        if (!skip) {
            fetchData(params);
        }
    }, []);

    // Permet de relancer la requête manuellement
    const refetch = async (newParams?: P) => await fetchData(newParams!);

    // Retourne les données et fonctions utiles
    return { data, loading, error, refetch };
};

export default useAppwrite;