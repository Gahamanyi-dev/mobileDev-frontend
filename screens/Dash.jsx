import { StyleSheet, Text, View ,StatusBar} from 'react-native'
import React from 'react';
import { useAuth } from "../components/GlobalContext";

const Dash = ({navigation}) => {
  const { userData, handleLogout} = useAuth();
  const logout =() =>{
    handleLogout();
    navigation.navigate('Login');
  }
  return (
    <View style={styles.container}>
      <View style={{justifyContent:"space-between",flexDirection:"row"}}>
      <View >
        
      <Text style={styles.header}>Welcome in </Text>
      <Text style={styles.username}>{userData.names} </Text>
      </View>
      <Text style={styles.logout} onPress={()=>logout()}>Log out</Text>
      </View>
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