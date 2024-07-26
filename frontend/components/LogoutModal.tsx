import { Modal, View, Text, Button, StyleSheet, TouchableHighlight } from "react-native";
import { useStore } from "../store/store";
import { useState } from "react";

type Props = {
    modal: boolean,
    setModal: (value: boolean |((prevValue: boolean) => boolean)) => void
}

export default function LogoutModal({modal, setModal}: Props) {
    const { logout } = useStore();

    const [textWhite, setTextWhite] = useState<boolean>(false); 
    
    function onLogout(): void {
        logout();
        setModal(false);
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modal}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text>Are you sure you want to logout?</Text>
                <View style={styles.buttonsContainer}>
                    {/* <Button color="red" title="Logout" onPress={onLogout} /> */}
                    {/* <Button title="Close" onPress={() => setModal(false)} /> */}
                    <TouchableHighlight onPressOut={() => setTextWhite(false)} onPressIn={() => setTextWhite(true)} underlayColor="red" style={{...styles.button, borderBottomLeftRadius: 20}} onPress={onLogout}>
                        <Text style={{color: textWhite ? "white": "black"}}>Logout</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={{...styles.button, borderBottomRightRadius: 20}} onPress={() => setModal(false)}>
                        <Text>Close</Text>
                    </TouchableHighlight>
                </View>
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
        marginTop: 22,
    },
    modalView: {
        gap:25,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 35,
        alignItems: 'center',
        justifyContent: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: "100%"
    },
    button: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        width: "50%",
        alignItems: 'center',
    },
})