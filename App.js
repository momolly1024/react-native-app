import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'

import data from './src/data/d.json'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function TrailListsScreen(props) {
    const [dataSource, setDataSource] = useState(data)
    const showDetail = (cases) => {
        props.navigation.push('TrailDetail', { passProps: cases })
    }
    const fetchData = () => {
        // return fetch(
        //     'https://s5.aconvert.com/convert/p3r68-cdx67/a7301-d75os.json'
        // )
        //     .then((response) => response.json())
        //     .then((d) =>
        //         d.map((r) => console.log(r.縣市, r.健走步道地點))
        //     )
        return data.map((r) => console.log(r.縣市, r.健走步道地點))
    }

    useEffect(() => {
        console.log(dataSource)
    }, [])

    useEffect(() => {
        setDataSource(data)
    }, [])
    if (dataSource.length > 0) {
        return (
            <View>
                {dataSource.map((r) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={() => showDetail(r)}>
                                <View>
                                    <View>
                                        <View style={{ fiex: 1 }}>
                                            <Text
                                                ellipsizeMode='tail'
                                                numberOfLines={3}
                                            >
                                                {r.縣市}
                                            </Text>
                                            <Text
                                                ellipsizeMode='tail'
                                                numberOfLines={3}
                                            >
                                                {r.步道名稱}
                                            </Text>
                                        </View>
                                    </View>
                                    <View />
                                </View>
                            </TouchableOpacity>
                            <Text style={{ textAlign: 'right' }}>
                                收藏 ｜已完成
                            </Text>
                        </View>
                    )
                })}
            </View>
        )
    }
}
function MyListsScreen(props) {
    return (
        <View>
            <Text>MyListsScreen</Text>
            {/* <Text>MyListsScreen</Text>
            <Text>MyListsScreen</Text>
            <Text>MyListsScreen</Text> */}
        </View>
    )
}
function TrailDetail(props) {
    const passProps = props.route.params.passProps || 'nothing get'
    return (
        <ScrollView>
            <Text style={{ fontSize: 50 }}> {passProps.步道名稱}</Text>
            <Text style={{ fontSize: 30 }}>{passProps.健走步道地點}</Text>
            <Text style={{ fontSize: 30 }}>{passProps.環境特色}</Text>
        </ScrollView>
    )
}
function TrailListsStack() {
    return (
        <Stack.Navigator initialRouteName='TrailListsScreen'>
            <Stack.Screen
                name='TrailListsScreen'
                component={TrailListsScreen}
            />
            {/* <Stack.Screen name='MyLists' component={MyListsScreen} /> */}
            <Stack.Screen name='TrailDetail' component={TrailDetail} />
        </Stack.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='TrailLists'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName

                        if (route.name === 'TrailLists') {
                            // return (
                            //     <Image
                            //         source={{
                            //             uri: 'https://images.pexels.com/photos/2872767/pexels-photo-2872767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                            //         }}
                            //         style={{ width: 50, height: 50 }}
                            //     />
                            // )
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline'
                        } else if (route.name === 'MyLists') {
                            iconName = focused ? 'ios-trophy' : 'ios-list'
                        }
                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        )
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}
            >
                <Tab.Screen name='TrailLists' component={TrailListsStack} />
                <Tab.Screen name='MyLists' component={MyListsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
