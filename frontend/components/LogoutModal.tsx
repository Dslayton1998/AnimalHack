import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { useStore } from "../store/store";

type Props = {
    modal: boolean,
    setModal: (value: boolean |((prevValue: boolean) => boolean)) => void
}

export default function LogoutModal({modal, setModal}: Props) {
    const { logout } = useStore();
    
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
                <View style={styles.buttons}>
                    <Button title="Logout" onPress={onLogout} />
                    <Button title="Close" onPress={() => setModal(false)} />
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
    buttons: {
        flexDirection: 'row',
        gap: 8
    }
})