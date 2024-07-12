import { Modal, View, StyleSheet, TextInput, Switch, Button } from "react-native"
import { ThemedText } from "./ThemedText"
import { useState } from "react"

type SignUpProps = {
    title?: string // question mark means optional
}

// const SignUpModal: React.FC<SignUpProps> = ({title}) => {
//     return null
// }

// export default SignUpModal

export default function SignUpModal({title}: SignUpProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isEmailPrivate, setIsEmailPrivate] = useState(true);
    const [isPhoneNumberPrivate, setIsPhoneNumberPrivate] = useState(true);

    const toggleEmailPrivacy = () => setIsEmailPrivate(!isEmailPrivate);
    const togglePhoneNumberPrivacy = () => setIsPhoneNumberPrivate(!isPhoneNumberPrivate);

    function signup(): void {

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
                    <Button title="Sign Up" onPress={() => {}} />
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