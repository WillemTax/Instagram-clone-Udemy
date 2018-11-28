import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { f, auth, database } from './config/config.js';

export default class App extends React.Component {

constructor(props)
{
  super(props);
  // this.registerUser('testemailadress2@helloworld.com', 'repelsteeltje');

  auth.signOut()
  .then(() => {
    console.log('Logged out...');
  }).catch((error) => {
    console.log('Error:', error);
  })

  // f.auth().onAuthStateChanged(function(user) {
  //   if(user){
  //     //Logged in
  //     console.log("logged in");
  //   }else{
  //     //Logged out
  //     console.log("Logged out");
  //   }
  // })
}
  
registerUser = (email, password) => {
  console.log(email, password);
  auth.createUserWithEmailAndPassword(email, password)
  .then((user) => console.log(email, password, user))
  .catch((error) => console.log("error logging in"))

}


  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app(s)!!</Text>
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
