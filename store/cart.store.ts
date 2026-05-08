import { CartCustomization, CartStore } from "@/type";
import { create } from "zustand";

// compare deux listes de customisations pour vérifier si elles sont identiques
function areCustomizationsEqual(
    a: CartCustomization[] = [],
    b: CartCustomization[] = []
): boolean {

    // si le nombre de customisations est différent, elles ne sont pas identiques
    if (a.length !== b.length) return false;

    // trie les customisations par ID pour pouvoir les comparer proprement
    const aSorted = [...a].sort((x, y) => x.id.localeCompare(y.id));
    const bSorted = [...b].sort((x, y) => x.id.localeCompare(y.id));

    // vérifie que chaque customisation correspond à la même position
    return aSorted.every((item, idx) => item.id === bSorted[idx].id);
}

export const useCartStore = create<CartStore>((set, get) => ({

    // contient tous les produits présents dans le panier
    items: [],

    addItem: (item) => {

        // récupère les customisations du produit ou un tableau vide
        const customizations = item.customizations ?? [];

        // cherche si le produit existe déjà avec les mêmes customisations
        const existing = get().items.find(
            (i) =>
                i.id === item.id &&
                areCustomizationsEqual(i.customizations ?? [], customizations)
        );

        // si le produit existe déjà, augmente simplement la quantité
        if (existing) {

            set({
                items: get().items.map((i) =>
                    i.id === item.id &&
                    areCustomizationsEqual(i.customizations ?? [], customizations)

                        // ajoute 1 à la quantité
                        ? { ...i, quantity: i.quantity + 1 }

                        // garde les autres produits inchangés
                        : i
                ),
            });

        } else {

            // ajoute un nouveau produit dans le panier
            set({
                items: [
                    ...get().items,
                    { ...item, quantity: 1, customizations }
                ],
            });
        }
    },

    removeItem: (id, customizations = []) => {

        // supprime le produit correspondant du panier
        set({
            items: get().items.filter(
                (i) =>
                    !(
                        i.id === id &&
                        areCustomizationsEqual(i.customizations ?? [], customizations)
                    )
            ),
        });
    },

    increaseQty: (id, customizations = []) => {

        // augmente la quantité d’un produit précis
        set({
            items: get().items.map((i) =>
                i.id === id &&
                areCustomizationsEqual(i.customizations ?? [], customizations)

                    ? { ...i, quantity: i.quantity + 1 }

                    : i
            ),
        });
    },

    decreaseQty: (id, customizations = []) => {

        // diminue la quantité d’un produit
        set({
            items: get()
                .items.map((i) =>
                    i.id === id &&
                    areCustomizationsEqual(i.customizations ?? [], customizations)

                        ? { ...i, quantity: i.quantity - 1 }

                        : i
                )

                // retire automatiquement les produits à 0 quantité
                .filter((i) => i.quantity > 0),
        });
    },

    clearCart: () =>

        // vide complètement le panier
        set({ items: [] }),

    getTotalItems: () =>

        // calcule le nombre total d’articles dans le panier
        get().items.reduce((total, item) => total + item.quantity, 0),

    getTotalPrice: () =>

        // calcule le prix total du panier
        get().items.reduce((total, item) => {

            // prix de base du produit
            const base = item.price;

            // additionne le prix des customisations
            const customPrice =
                item.customizations?.reduce(
                    (s: number, c: CartCustomization) => s + c.price,
                    0
                ) ?? 0;

            // ajoute le total du produit au panier
            return total + item.quantity * (base + customPrice);

        }, 0),
}));