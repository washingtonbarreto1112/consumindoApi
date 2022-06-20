import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const api = async(callback) => {
  const resposta = await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/');
  const parsed = await resposta.json();
  callback(parsed.data)
}

export default function App() {
  const [registro, setRegistros] = useState([]);

  useEffect(()=>{
  api(setRegistros);
  },[]);  
  
  return (
    <View style={estilo.container}>
      <Text style={estilo.titulo}>Evolução do Covid-19 no Mundo.</Text>
      <FlatList
        data={registro}
        keyExtractor={(item) => item.uid.toString()}
        numColumns={2}
        renderItem = {({item})=><Text style={estilo.item}> {item.uf} - {item.state} {'\n'}Casos: {item.cases}</Text>}

      />
      <StatusBar style="auto" />
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9f7',
    
  },
  titulo:{
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 30
  },
  item:{
    flex:1,
    paddingVertical: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
    marginTop: 15,
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 15,
    paddingRight: 15
  }
});
