import {SplashScreen, Stack} from "expo-router";
import './globals.css';
import {useFonts} from "expo-font";
import {useEffect} from "react";
import * as Sentry from '@sentry/react-native'; // outil pour suivre les erreurs en production
import useAuthStore from "@/store/auth.store";

// Initialise Sentry pour suivre les erreurs et logs de l'application
Sentry.init({
  dsn: 'https://982ab465126e123d6992007a3101e8c2@o1059999.ingest.us.sentry.io/4511315502891008',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true, // autorise l'envoi de données utilisateur pour debug

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1, // enregistre 10% des sessions utilisateur
  replaysOnErrorSampleRate: 1, // enregistre toutes les sessions en cas d'erreur
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()], // ajoute replay + feedback utilisateur

});

export default Sentry.wrap(function RootLayout() {

  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  // Charge les polices personnalisées utilisées dans l'app
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  })

  useEffect(() => {
    if (error) throw error; // stoppe l'app si erreur de chargement
    if (fontsLoaded) SplashScreen.hideAsync(); // enlève l'écran de chargement
  }, [fontsLoaded, error]);

  // Vérifie si un utilisateur est déjà connecté au lancement de l'app
  useEffect(() => {
    fetchAuthenticatedUser()
  }, []);

  // Tant que les fonts ou les données utilisateur ne sont pas prêtes, on n'affiche rien
  if (!fontsLoaded || isLoading) return null

  return <Stack screenOptions={{ headerShown: false }}/>;
});
