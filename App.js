import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {AppRegistry } from 'react-native';
import { TextInput } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import MyComponentBN from './component/bottomnavigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import Clipboard from '@react-native-clipboard/clipboard';
import * as Clipboard from 'expo-clipboard'



export default function App() {
  const [text, setText] = useState('');
  // array func for quotes
  const [Quote, setQuote] = useState('Loading quote...');
  const [Author, setAuthor] = useState('Loading quote...');

  const changeHandler = (val) => {
    setText(val);
  }

  

  // Fetches quote api
  const randomQuote = () => {
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
      console.log(result.content);
      setQuote(result.content);
      setAuthor(result.author);
    })      
  }

  useEffect(()=> {
    randomQuote();
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(Quote);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };


  return (
    // react native paper 
    <PaperProvider> 
      
      <TouchableWithoutFeedback onPress = {() => {
        Keyboard.dismiss();
      }}> 
      <View style={styles.container}>
        {/* Title View */}
        <Text style={styles.title}>Chournal</Text>
        
        <View>
          
          {/* TextInput View */}
          <TextInput 
            label = 'Journal entry'
            placeholder = 'What happened today?'
            multiline
            value = {text}
            onChangeText={changeHandler}
            style={{borderRadius: 20,}}
          />
        
        </View>

        {/* Start of quote card */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10,}}>
          <View >
            <Text style={{marginBottom:10, fontSize: 26, textAlign: 'center'}}>Today's Quote</Text>
            <Text style={{fontSize: 16, lineHeight: 30, letterSpacing: 1.1, textAlign: 'center' }}>{Quote}</Text>
            <Text style={{textAlign: 'right', fontWeight: '400', fontStyle: 'italic'}}>-{Author}</Text>
          </View>          
        </View>

          {/* Buttons for quote card */}
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity 
              onPress={copyToClipboard}
              style={{
                borderWidth: 2,
                borderColor: 'dodgerblue',
                borderRadius: 50,
                padding: 15,
                marginBottom: 10
              }} >               
              <FontAwesome name='copy' size={22} color='dodgerblue' />
              
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={randomQuote}
              style={{
                borderWidth: 2,
                borderColor: 'dodgerblue',
                borderRadius: 55,
                padding: 15,
                marginBottom: 10
              }}>
              <FontAwesome name='forward' size={22} color='dodgerblue' />
            </TouchableOpacity>
        </View>

        

        <StatusBar style="auto" />
        {/* BottomNavigator */}
        <MyComponentBN />
      </View>
      
      </TouchableWithoutFeedback>
    </PaperProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 25,
    padding: 10,

    
  }
});


//App.Registry.registerComponent(appName, () => Main);
