import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import * as React from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';


export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Something
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});
