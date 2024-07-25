// Login: Email & Password only =>
// Hit the backend for a login request
//  If successful redirect to home page
//  If unsuccessful, tell the user and allow them to attempt again
import { Modal, View, StyleSheet, TextInput, Switch, Button } from "react-native"
import { ThemedText } from "./ThemedText"
import { useState } from "react"
import { useStore } from "../store/store"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

interface LoginFormData {
    email: string,
    password: string,
};

type Props = {
    modal: boolean,
    setModal: (value: boolean | ((prevValue: boolean) => boolean)) => void
}

export default function LoginModal({modal, setModal}: Props) {
    const { login } = useStore();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // ^ Variables holding the values the user fills into the form

    function onLogin(): void {
        const formDataInfo : LoginFormData = {
            email: email,
            password: password
        }

        login(formDataInfo)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
        >
            <KeyboardAwareScrollView contentContainerStyle={styles.centeredView} enableAutomaticScroll>
                <View style={styles.modalView}>
                    <ThemedText type="title">Login!</ThemedText>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
                    <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" />
                    <Button title="Login" onPress={onLogin} />
                    <Button title="Close" onPress={() => {setModal(false); console.log('test', `${process.env.EXPO_PUBLIC_API_URL}/users/login/`)}} />
                </View>
            </KeyboardAwareScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,    
    }
})