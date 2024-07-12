import { Button, Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStore } from '@/store/store';
import { useEffect, useState } from 'react';
import SignUpModal from '@/components/SignUpModal';
export default function HomeScreen() {
  const {bears, fetch} = useStore();
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);

  useEffect(() => {fetch()}, []);

  console.log(bears)
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
        setSignUpModalVisible(true);
      }} />
      {signUpModalVisible && <SignUpModal title="im a test"/>}
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
