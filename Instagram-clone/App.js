import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { f, auth, database, facebookAppID } from './config/config.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    // this.registerUser('testemailadress2@helloworld.com', 'repelsteeltje');

    f.auth().onAuthStateChanged(function (user) {
      if (user) {
        //Logged in
        console.log("logged in", user);
      } else {
        //Logged out
        console.log("Logged out!!");
      }
    });
  }

  async loginWithFacebook() {

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      facebookAppID,
      { permissions: ['email', 'public_profile'] }
    );

    if (type === 'success') {
      const credentials = f.auth.FacebookAuthProvider.credential(token);
      f.auth().signInAndRetrieveDataWithCredential(credentials).catch((error) => {
        console.log('Oeps, something went wrong login in', error);
        // f.auth().signInWithCredential(credentials).catch((error) => {
        //   console.log('Oeps, something went wrong login in', error);
      })
    } else {
      console.log('no succes');
    }
  }

  registerUser = (email, password) => {
    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
      .then((user) => console.log(email, password, user))
      .catch((error) => console.log("error logging in"));

  }
  // auth.signOut()
  // .then(() => {
  //   console.log('Logged out...');
  // }).catch((error) => {
  //   console.log('Error:', error);
  // })

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app(s)!!</Text>
        <TouchableHighlight
          onPress={() => this.loginWithFacebook()}
          style={{ backgroundColor: 'blue' }}>
          <Text style={{ color: 'white' }}>Login with Facebook</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
