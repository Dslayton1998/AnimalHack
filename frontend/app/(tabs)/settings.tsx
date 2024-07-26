import { Button, Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStore } from '@/store/store';
import { useEffect, useState } from 'react';
import SignUpModal from '@/components/SignUpModal';
import LoginModal from '@/components/LoginModal';
import LogoutModal from '@/components/LogoutModal';
export default function HomeScreen() {
  const {bears, fetch} = useStore();

  const [signUpModalVisible, setSignUpModalVisible] = useState<boolean>(false);
  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);

  useEffect(() => {fetch()}, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{bears.test}</ThemedText>
      </ThemedView>
      {/* <Button title="Login" onPress={fetch} /> */}
      <Button title="Sign Up" onPress={() => {
        setSignUpModalVisible(!signUpModalVisible);
      }} />
      <Button title="Login" onPress={() => {
        setLoginModalVisible(!loginModalVisible);
      }} />
      <Button title="Logout" onPress={() => setLogoutModalVisible(!logoutModalVisible)} />

      {signUpModalVisible ? <SignUpModal modal={true} setModal={setSignUpModalVisible}/> : <SignUpModal modal={false} setModal={setSignUpModalVisible}/>}
      {loginModalVisible ? <LoginModal modal={true} setModal={setLoginModalVisible}/> : <LoginModal modal={false} setModal={setLoginModalVisible}/>}
      {logoutModalVisible ? <LogoutModal modal={true} setModal={setLogoutModalVisible}/> : <LogoutModal modal={false} setModal={setLogoutModalVisible}/>}
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
