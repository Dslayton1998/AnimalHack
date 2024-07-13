import { Modal, View, StyleSheet, TextInput, Switch, Button } from "react-native"
import { ThemedText } from "./ThemedText"
import { useState } from "react"
import { useStore } from "../store/store"

type SignUpProps = {
    title?: string // question mark means optional
}

interface FormData {
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    city: string,
    state: string,
    password: string,
    is_email_private: boolean,
    is_phone_number_private: boolean

}

// const SignUpModal: React.FC<SignUpProps> = ({title}) => {
//     return null
// }

// export default SignUpModal

/// title props is there as an example for typescript reference
export default function SignUpModal({title}: SignUpProps) {
    const { signUp, fetch } = useStore();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [isEmailPrivate, setIsEmailPrivate] = useState<boolean>(true);
    const [isPhoneNumberPrivate, setIsPhoneNumberPrivate] = useState<boolean>(true);

    const toggleEmailPrivacy = () => setIsEmailPrivate(!isEmailPrivate);
    const togglePhoneNumberPrivacy = () => setIsPhoneNumberPrivate(!isPhoneNumberPrivate);

    function onSignup(): void {
        const formData : FormData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,
            city: city,
            state: state,
            password: password,
            is_email_private: isEmailPrivate,
            is_phone_number_private: isPhoneNumberPrivate
        }

        signUp(formData);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ThemedText type="title">Sign Up</ThemedText>
                    <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First name" />
                    <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last Name" />
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
                    <Switch 
                        value={isEmailPrivate} 
                        onValueChange={toggleEmailPrivacy} 
                        trackColor={{false: "#767577", true: "#81b0ff"}}
                        thumbColor={isEmailPrivate ? "#f5dd4b" : "#f4f3f4"}
                    />
                    <TextInput style={styles.input} keyboardType="numeric" value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" />
                    <Switch 
                        value={isPhoneNumberPrivate} 
                        onValueChange={togglePhoneNumberPrivacy}
                        trackColor={{false: "#767577", true: "#81b0ff"}}
                        thumbColor={isPhoneNumberPrivate ? "#f5dd4b" : "#f4f3f4"}
                    />
                    <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="City" />
                    <TextInput style={styles.input} value={state} onChangeText={setState} placeholder="State" />
                    <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" />
                    <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm Password" />
                    <Button title="Sign Up" onPress={onSignup} />
                </View>
            </View>
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