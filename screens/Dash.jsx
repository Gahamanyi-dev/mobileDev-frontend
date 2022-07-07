import { StyleSheet, Text, View ,StatusBar} from 'react-native'
import React from 'react';
import { useAuth } from "../components/GlobalContext";

const Dash = () => {
  const { userData } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome in </Text>
      <Text style={styles.username}>{userData.names} </Text>
    </View>
  )
}

export default Dash

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:StatusBar.currentHeight,
        paddingHorizontal:15,
        backgroundColor:'#fff'
    },
    header:{
        fontSize:25,
        fontWeight:'bold',
    },
    username:{
        fontSize:18,
        color:'#307A59',
    }
})