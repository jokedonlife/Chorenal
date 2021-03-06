import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { useState } from 'react';

const JournalRoute = () => <Text></Text>;
const GoalsRoute = () => <Text></Text>;
const HabitRoute = () => <Text></Text>;
//const ProfileRoute = () => <Text>Profile</Text>;]

const MyComponentBN = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      {key: 'journal', title: 'Journal', icon: 'pen', activeColor: 'dodgerblue'},
      {key: 'goals', title: 'Goals', icon: 'target', color: 'grey'},
      {key: 'habit', title: 'Habits', icon: 'flag'},
    ]);

    const renderScene = BottomNavigation.SceneMap({
        journal: JournalRoute,
        goals: GoalsRoute,
        habit: HabitRoute,
      });

    return (
        <BottomNavigation 
            navigationState = {{index, routes}}
            onIndexChange = {setIndex}
            renderScene = {renderScene}
            barStyle = {{backgroundColor: 'dodgerblue'}}
            style={{
              //flex: 1,
              //borderRadius: 21,
              
            }}
            
        />
    );
};

export default MyComponentBN;









