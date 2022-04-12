import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'

const GoalScreen = ({navigation}) => {
    return (
        <View>
            <Text style={styles.container}>Goal Screen</Text>
            <Button 
                title = "Click Here"
                onPress={()=> alert('Button Clicked!')}
            />
        </View>
    )
}

export default GoalScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc',
    }
})