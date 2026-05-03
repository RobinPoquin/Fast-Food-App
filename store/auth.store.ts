import { create } from 'zustand'
import {User} from "@/type"; // type représentant un utilisateur
import {getCurrentUser} from "@/lib/appwrite"; // fonction qui récupère l'utilisateur connecté

// Définition du store d'authentification
type AuthState = {
    isAuthenticated: boolean;
    user: User | null; // stocke les infos de l'utilisateur
    isLoading: boolean; // indique si une requête est en cours

    setIsAuthenticated: (value: boolean) => void; // met à jour l'état connecté/non connecté
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>; // récupère l'utilisateur depuis le backend
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false, // par défaut l'utilisateur n'est pas connecté
    user: null, // aucun utilisateur au départ
    isLoading: true, // on considère qu'on charge au début

    setIsAuthenticated: (value) => set({ isAuthenticated: value }), // met à jour l'état de connexion
    setUser: (user) => set({user}),
    setLoading: (value) => set({isLoading: value}),

    fetchAuthenticatedUser: async () => {
        set({isLoading: true}); // active le loading

        try {
            const user = await getCurrentUser(); // récupère l'utilisateur connecté
            if (user) set({ isAuthenticated: true, user: user as unknown as User }); // si trouvé → connecté
            else set ({ isAuthenticated: false, user: null }); // sinon → non connecté
        } catch (e) {
            console.log('fetchAuthenticatedUser erreur', e); // log l'erreur
            set({isAuthenticated: false, user: null }); // reset en cas d'erreur
        } finally {
            set({isLoading: false}); // désactive le loading
        }
    }
}))

export default useAuthStore;