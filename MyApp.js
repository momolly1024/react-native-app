// import {
//     StyleSheet,
//     Text,
//     View,
//     TouchableOpacity,
//     ScrollView,
//     FlatList,
//     Image,
//     TextInput,
//     Button,
// } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// import Ionicons from 'react-native-vector-icons/Ionicons'

// import * as StorageHelper from './src/helpers/StorageHelper'
// import data from './src/data/d.json'

// const Tab = createBottomTabNavigator()
// const Stack = createStackNavigator()

// function TrailListsStack() {
//     return (
//         <Stack.Navigator
//             initialRouteName='TrailListsScreen'
//             screenOptions={{
//                 headerStyle: { backgroundColor: 'tomato' },
//                 headerBackTitle: '返回',
//                 headerTintColor: 'white',
//             }}
//         >
//             <Stack.Screen
//                 name='TrailListsScreen'
//                 component={TrailListsScreen}
//             />
//             {/* <Stack.Screen name='MyLists' component={MyListsScreen} /> */}
//             <Stack.Screen
//                 name='TrailDetail'
//                 component={TrailDetail}
//                 options={{ title: 'Trail Detail' }}
//             />
//         </Stack.Navigator>
//     )
// }

// function TrailListsScreen(props) {
//     const [dataSource, setDataSource] = useState(data)
//     const showTrailDetail = (list) => {
//         props.navigation.push('TrailDetail', { passProps: list })
//     }
//     const fetchData = () => {
//         // return fetch(
//         //     'https://s5.aconvert.com/convert/p3r68-cdx67/a7301-d75os.json'
//         // )
//         //     .then((response) => response.json())
//         //     .then((d) =>
//         //         d.map((r) => console.log(r.縣市, r.健走步道地點))
//         //     ).catch((err)=>console.log(err))
//         return data.map((r) => console.log(r.縣市, r.健走步道地點))
//     }

//     // 台北市API ===============================================
//     const [taipeiTrail, setTaipeiTrail] = useState([])
//     const tpeApi = () => {
//         fetch(
//             'https://data.taipei/api/v1/dataset/1c6a4f3b-d8e9-4ee0-aed6-1ad9e2387ff5?scope=resourceAquire'
//         )
//             .then((r) => r.json())
//             .then((d) => {
//                 setTaipeiTrail(d.result.results)
//             })
//             .catch((err) => console.log(err))
//     }
//     useEffect(() => {
//         tpeApi()
//     }, [])
//     useEffect(() => {
//         setDataSource(taipeiTrail)
//     }, [taipeiTrail])
//     // 台北市API ===============================================
//     // 衛生署 API ==============================================
//     useEffect(() => {
//         // 衛生署 API
//         // setDataSource(data)
//     }, [data])
//     // 衛生署 API ==============================================

//     const pressRow = (list) => {
//         const newDatas = dataSource.map((r) => {
//             let copyR = { ...r }
//             if (copyR._id === list._id) {
//                 copyR.addToMyList = !copyR.addToMyList
//             }
//             return copyR
//         })
//         setDataSource(newDatas)
//     }
//     const saveToStorage = async (getMyLists) => {
//         try {
//             await StorageHelper.setMySetting(
//                 'myList',
//                 JSON.stringify(getMyLists)
//             )
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         let getAll = []
//         dataSource.map((r) => {
//             if (r.addToMyList === true) {
//                 getAll.push(r)
//             }
//         })
//         saveToStorage(getAll)
//     }, [])

//     const renderLists = (list) => {
//         return (
//             <TouchableOpacity onPress={() => showTrailDetail(list)}>
//                 <View>
//                     <View style={styles.MainView}>
//                         <TouchableOpacity
//                             onPress={() => {
//                                 pressRow(list)
//                             }}
//                         >
//                             {list.addToMyList === true ? (
//                                 <Image
//                                     source={require('./src/img/heart.png')}
//                                     style={styles.imgChecked}
//                                 />
//                             ) : (
//                                 <Image
//                                     source={require('./src/img/heart-empty.png')}
//                                     style={styles.imgChecked}
//                                 />
//                             )}
//                         </TouchableOpacity>
//                         {/* <Image
//                             source={{
//                                 uri: 'https://pic.pimg.tw/cc1895/1431185098-1614666523.jpg',
//                             }}
//                             style={styles.thumbnail}
//                         /> */}
//                         <Image
//                             source={{
//                                 uri: list.照片
//                                     ? list.照片
//                                     : `https://picsum.photos/200/300?random=${list._id}`,
//                             }}
//                             style={styles.thumbnail}
//                         />
//                         <View style={{ flex: 1 }}>
//                             <Text>{list.步道名稱}</Text>

//                             <Text>
//                                 {list.縣市} - {list.健走步道地點}
//                             </Text>
//                         </View>
//                         <TouchableOpacity
//                         // onPress={() => {
//                         //     pressRow(list)
//                         // }}
//                         >
//                             <Text style={{ textAlign: 'right' }}>?</Text>
//                         </TouchableOpacity>
//                         {/* <Image
//                             source={{
//                                 uri: 'https://picsum.photos/200/300',
//                             }}
//                             style={styles.image}
//                         /> */}
//                     </View>
//                     <View style={styles.seperator} />
//                 </View>
//             </TouchableOpacity>
//         )
//     }

//     return (
//         <View>
//             <FlatList
//                 nestedScrollEnabled
//                 data={dataSource}
//                 renderItem={(lists) => renderLists(lists.item)}
//                 // keyExtracto={(lists) => lists.健走步道地點}
//                 keyExtracto={(lists) => lists._id.toString()}
//                 style={{ backgroundColor: 'white' }}
//             />
//         </View>
//     )
// }

// function TrailDetail(props) {
//     const passProps = props.route.params.passProps || 'nothing get'
//     return (
//         <ScrollView>
//             <Text style={{ fontSize: 50 }}> {passProps.步道名稱}</Text>
//             <Text style={{ fontSize: 30 }}>{passProps.健走步道地點}</Text>
//             <Text style={{ fontSize: 30 }}>{passProps.環境特色}</Text>
//         </ScrollView>
//     )
// }

// function MyListsStack() {
//     return (
//         <Stack.Navigator
//             initialRouteName='MyLists'
//             screenOptions={{
//                 headerStyle: { backgroundColor: 'tomato' },
//                 headerBackTitle: '返回2',
//                 headerTintColor: 'white',
//             }}
//         >
//             <Stack.Screen name='MyListsScreen' component={MyListsScreen} />
//             <Stack.Screen
//                 name='MyListsDetailScreen'
//                 component={MyListsDetailScreen}
//                 options={{ title: 'My MyListsDetailScreen' }}
//             />
//         </Stack.Navigator>
//     )
// }

// function MyListsScreen(props) {
//     const [myListCount, setMyListCount] = useState(0)
//     const [myListName, setMyListName] = useState([])
//     const loadStorage = async () => {
//         let listGet = await StorageHelper.getMySetting('myList')

//         let a = JSON.parse(listGet)
//         setMyListCount(a.length)
//         setMyListName(listGet)
//     }
//     useEffect(() => {
//         const unsubscribe = props.navigation.addListener('focus', () => {
//             loadStorage()
//         })
//         return unsubscribe
//     }, [myListCount])

//     // const changeName = async () => {
//     //     try {
//     //         await StorageHelper.setMySetting('name', name)
//     //     } catch (err) {
//     //         console.error(err)
//     //     }
//     // }

//     return (
//         <View style={styles.container}>
//             <Text>收藏</Text>
//             {/* <Text>{myListCount}</Text>
//             {myListName.map((r, idx) => {
//                 return <Text key={idx}>hello,{r}</Text>
//             })} */}
//             <Text>{myListCount}</Text>
//             {myListName.map((r, idx) => {
//                 return <Text key={idx}>hello, {r.行政區}</Text>
//             })}
//         </View>
//     )
// }
// function MyListsDetailScreen(props) {
//     return (
//         <View>
//             <Text>還沒有進入點，要從 my lists screen 帶進來</Text>
//             {/* <Text>MyListsScreen</Text>
//             <Text>MyListsScreen</Text>
//             <Text>MyListsScreen</Text> */}
//         </View>
//     )
// }
// export default function App() {
//     return (
//         <NavigationContainer>
//             <Tab.Navigator
//                 initialRouteName='TrailLists'
//                 screenOptions={({ route }) => ({
//                     tabBarIcon: ({ focused, color, size }) => {
//                         let iconName

//                         if (route.name === 'TrailLists') {
//                             // return (
//                             //     <Image
//                             //         source={{
//                             //             uri: 'https://images.pexels.com/photos/2872767/pexels-photo-2872767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//                             //         }}
//                             //         style={{ width: 50, height: 50 }}
//                             //     />
//                             // )
//                             iconName = focused
//                                 ? 'ios-information-circle'
//                                 : 'ios-information-circle-outline'
//                         } else if (route.name === 'MyLists') {
//                             iconName = focused ? 'ios-trophy' : 'ios-list'
//                         }
//                         return (
//                             <Ionicons
//                                 name={iconName}
//                                 size={size}
//                                 color={color}
//                             />
//                         )
//                     },
//                     tabBarActiveTintColor: 'tomato',
//                     tabBarInactiveTintColor: 'gray',
//                     headerShown: false,
//                 })}
//             >
//                 <Tab.Screen name='TrailLists' component={TrailListsStack} />
//                 <Tab.Screen name='MyLists' component={MyListsStack} />
//             </Tab.Navigator>
//         </NavigationContainer>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     MainView: {
//         height: 80,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         padding: 8,
//     },
//     seperator: {
//         height: 1,
//         backgroundColor: '#dddddd',
//     },
//     thumbnail: {
//         width: 50,
//         height: 60,
//         marginRight: 10,
//     },
//     imgChecked: {
//         width: 25,
//         height: 25,
//         marginRight: 10,
//     },
// })
