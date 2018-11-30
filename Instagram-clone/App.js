import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { f, auth, database, facebookAppID } from './config/config.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedI: false
    };
    // this.registerUser('wj.v.dun@gmail.com', '123');
    var that = this;
    f.auth().onAuthStateChanged(function (user) {
      if (user) {
        //Logged in
        that.setState(
          { loggedIn: true })
        console.log("logged in", user);
      } else {
        //Logged out
        that.setState(
          { loggedIn: false })
        console.log("Logged out!!");
      }
    });
  }

  loginUser = async (email, pass) => {
    if (email != '' && pass != '') {
      //
      try {
        let user = await auth.signInWithEmailAndPassword(email, pass);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Missing email or password');
    }
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

  signUserOut = () => {
    auth.signOut()
      .then(() => {
        console.log('Logged out...');
      }).catch((error) => {
        console.log('Error:', error);
      })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Welcome to Willem's first app!!</Text>
        {this.state.loggedIn == true ? (
          <View>
            <TouchableHighlight
              onPress={() => this.signUserOut()}
              style={{ backgroundColor:'red'}}>
              <Text>Log out</Text>
            </TouchableHighlight>
            <Text style={{ color:'#e15c55'}}>You are logged in now!</Text>
          </View>
        ) : (
            <View>
              { this.state.emailLoginView == true ? (
                
                <View>
                  <TextInput
                  placeholder={'emailadres'}
                  style={{backgroundColor:'#aaaaaa'}}
                  onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}
                  />

                  <TextInput
                  placeholder={'password'}
                  style={{backgroundColor:'#aaaaaa'}}
                  onChangeText={(text) => this.setState({pass: text})}
                  secureTextEntry={true}
                  value={this.state.pass}
                  />

                  <TouchableHighlight
              onPress={() => this.loginUser(this.state.email, this.state.pass)}
              style={{ backgroundColor:'red'}}>
              <Text>Login</Text>
            </TouchableHighlight>
                  </View>
              ) : (
                <View></View>
              )}
                  
              <TouchableHighlight
                onPress={() => this.setState({ emailLoginView: true })}
                style={{ backgroundColor: '#6b5998' }}>
                <Text style={{ color: 'white' }}>Login with Email</Text>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => this.loginWithFacebook()}
                style={{ backgroundColor: '#3b5998' }}>
                <Text style={{ color: 'white' }}>Login with Facebook</Text>
              </TouchableHighlight>
            </View>
          )}

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
