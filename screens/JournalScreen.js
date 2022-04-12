import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, FlatList, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {AppRegistry } from 'react-native';
import { TextInput } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
//import MyComponentBN from './component/bottomnavigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import Clipboard from '@react-native-clipboard/clipboard';
import * as Clipboard from 'expo-clipboard';
import DateTimePicker from '@react-native-community/datetimepicker'

import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//import Tabs from './navigation/tabs';
import { render } from 'react-dom';


//import AsyncStorage from '@react-native-async-storage/async-storage';








export default function App() {
  const [text, setText] = useState('');
  // array func for quotes
  const [Quote, setQuote] = useState('Loading quote...');
  const [Author, setAuthor] = useState('Loading quote...');
  const [currentDate, setCurrentDate] = useState('');
  const [Word, setWord] = useState('Loading word...');
  const [Definition, setDefinition] = useState('');
  const [Affirmation, setAffirmation] = useState('');
  const [Gratitude, setGratitude] = useState('');


  //const Tab = createMaterialBottomTabNavigator();
 

  const changeHandler = (val) => {
    setText(val);
  }  

  const changeHandlerAffirmation = (val) => {
    setAffirmation(val);
  }

  const changeHandlerGratitude = (val) => {
    setGratitude(val);
  }

  // Fetches quote api
  const randomQuote = () => {
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
      console.log(result.content);
      setQuote(result.content);
      setAuthor(result.author);
    })      
  }

    // fetches word api
  const randomWord = () => {
    fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "d2ead3b09amshe25aa0abcba21d3p1d6730jsn1a62fedb3ad4"
    }
    })
    .then(response => response.json()).then(result =>{
      console.log(result.word);
      setWord(result.word)
      setDefinition(result.definition)
    })
    .catch(err => {
      console.error(err);
  });  
  } // end of random word fetch

  // hook- get word of the day 
  // useEffect(()=>{
  //   randomWord();
  // }, []);

  // hook - get quotes
  useEffect(()=> {
    randomQuote();
  }, []);

  // hook - get dates
  useEffect(()=>{
    var date = new Date().getDate()
    var month = new Date().getMonth()
    var year = new Date().getFullYear()

    setCurrentDate(month+1 + '/' + date + '/' + year);
  }, []);

  // variables to copy quote using clipboard api 
  const copyToClipboard = () => {
    Clipboard.setString(Quote);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };



  // start of app code with return
  return (
    // react native paper 
    
    
    
    <PaperProvider> 
     
    
      <KeyboardAvoidingView
          behavior={Platform.Os == 'android' ? 'padding' : 'height'+ 15}
          style={styles.container}>   

      
      <TouchableWithoutFeedback onPress = {() => {
        Keyboard.dismiss();
      }}> 

    {/* Begin of Screen view */}
    <View style={{flex:1}}>
      {/* Header */}
      <View>
      {/* Title View */}
      {/* <Text style={styles.title}>Chournal</Text> */}
        <Text style={{paddingLeft: 10}}>{currentDate}</Text>
      </View>
      
      {/* Content */}
      
      <ScrollView>
                        
        <View >          
          
          {/* TextInput View */}
          <TextInput 
            label = 'Journal entry'
            placeholder = 'What happened today?'
            multiline = {true}
            collapsable
            scrollEnabled
            //maxLength = {130}
            autoCapitalize={'characters', 'words', 'sentences'}
            autoComplete = {true}
            autoCorrect = {true}
            numberOfLines={4}      
            //autoFocus = {true}
            spellCheck
            value = {text}
            right={<TextInput.Affix text="/100"/>}
            onChangeText={changeHandler}
            style= {styles.sJournalInput}
            mode='flat' // default is flat or outline 
            underlineColor='transparent'
            activeUnderlineColor='darkslategrey'
            style={{width: '96%', margin: '2%', borderRadius: 10}}
          />                 
        </View>

        {/* Start of quote card */}
        <View style={{flex: 0, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 15, padding: 10, backgroundColor: '#e7e7e7', margin:'2%', borderRadius: 10}}>
          <View >
            <Text style={{marginBottom:10, fontSize: 21, textAlign: 'center'}}>Today's Quote</Text>
            <Text style={{fontSize: 15, lineHeight: 30, letterSpacing: 1.1, textAlign: 'center' }}>{Quote}</Text>
            <Text style={{textAlign: 'right', fontWeight: '400', fontStyle: 'italic'}}>-{Author}</Text>
          </View> 

          {/* Buttons for quote card */}
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingTop: 10}}>
            <View style={{marginRight: 10}}>
            <TouchableOpacity 
              onPress={copyToClipboard}
              style={{
                borderWidth: 2,
                borderColor: 'dodgerblue',
                borderRadius: 50,
                padding: 15,
                marginBottom: 10
                
              }} >               
              <FontAwesome name='copy' size={22} color='dodgerblue'/>
              
            </TouchableOpacity>
            </View>
            <View>
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
            
          </View>                   
        </View>

        {/* start of word of the day card */}
        <View style={{flex: 0, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 15, padding: 10, backgroundColor: '#e7e7e7', margin:'2%', borderRadius: 10}}>
              <Text style={{marginBottom: 10, fontSize: 18, textAlign: 'center'}}>Word of the day</Text>
        </View>          
        <KeyboardAvoidingView>
        {/* start of daily affirmation textbox  */}
        <View style={{paddingBottom:0}}>
          <TextInput 
              label = 'Daily Affirmation'
              placeholder = 'Todays affirmation...'
              multiline = {true}
              //maxLength = {130}
              autoCapitalize={'characters', 'words', 'sentences'}
              autoComplete = {true}
              autoCorrect = {true}
              //numberOfLines={6}
              autoFocus

              value = {Affirmation}
              onChangeText={changeHandlerAffirmation}
              
              underlineColor='transparent'
              style= {styles.sJournalInput}
              
            />
        </View>

        
                
        {/* start of daily gratitude */}
        <View >
          <TextInput 
              label = 'Daily Gratitude'
              placeholder = 'Todays gratitude...'
              multiline = {true}
              //maxLength = {130}
              autoCapitalize={'characters', 'words', 'sentences'}
              autoComplete = {true}
              autoCorrect = {true}
              //numberOfLines={6}
              autoFocus

              value = {Gratitude}
              onChangeText={changeHandlerGratitude}
              
              underlineColor='transparent'
              style= {styles.sJournalInput}
              
            />
        </View>
        </KeyboardAvoidingView>
          
      
      </ScrollView>
        
        

     
    </View>
   
      </TouchableWithoutFeedback>
      
      
      
      
      
      </KeyboardAvoidingView> 
      

      
      <StatusBar style="auto" />
      </PaperProvider>
      
      
      
   
    
  );
}


// stylesheets 
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
  },
  sJournalInput: {
  margin: '2%',
  width: '96%',
  borderRadius: 10,
}
});


//App.Registry.registerComponent(appName, () => Main);
{/* <View>
//<MyComponentBN style = {{position: 'absolute', bottom: 0}} />
//{/* BottomNavigator */}
//</View>  */}
