import {View, Text, Button} from 'react-native'
import React from 'react'
import {router} from "expo-router";

const SignUp = () => {
    return (
        <View>
            <Text>S'inscrire</Text>
            <Button title="Se connecter" onPress={() => router.push('/sign-in')} />
        </View>
    )
}
export default SignUp
