import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react';
import GoalScreen from '../screens/GoalScreen';
import JournalScreen from '../screens/JournalScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator 
            screenOptions={{
                tabBarShowLabel: true,
                //tabBarStyle: { left: 10, right: 10, borderRadius: 15 },
                headerTitle: false,
                headerStatusBarHeight: 25,
                //headerShown: false,
                tabBarHideOnKeyboard: true,
            }}    
        >
            
            <Tab.Screen 
                name="Chournal"
                component={JournalScreen}
                options={{
                    tabBarLabel: 'Journal',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="pen" color={color} size={size} />
                    )         
                }}            
            />

            <Tab.Screen
                name="Goals" 
                component={GoalScreen} 
                options={{
                    tabBarLabel: 'Goals',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="target" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;