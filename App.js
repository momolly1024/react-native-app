import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TextInput,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'

import * as StorageHelper from './src/helpers/StorageHelper'
import data from './src/data/TaiwanAttractions.json'
function HomeDetailScreen(props) {
    const passProps = props.route.params.passProps || 'nothing get'
    return (
        <View style={styles.container}>
            <Text>HomeDetailScreen</Text>
            <Text>{passProps.note}</Text>

            <Text>{passProps.animal_kind + ' ' + passProps.animal_colour}</Text>
            <Text>{passProps.animal_place}</Text>
            <Text>{passProps.shelter_tel}</Text>
        </View>
    )
}
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
function ProfileScreen(props) {
    const [myBookCount, setMyBookCount] = useState(0)
    const [myBookListName, setMyBookListName] = useState([])

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            loadStorage()
        })
        return unsubscribe
    }, [myBookCount])

    const loadStorage = async () => {
        let bookGet = await StorageHelper.getMySetting('myList')

        let a = JSON.parse(bookGet)
        setMyBookCount(a.length)
        setMyBookListName(a)
    }

    return (
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
            <Text>我收藏了{myBookCount}個寵物認養</Text>

            {myBookListName.map((pet, index) => {
                return (
                    <Text key={index}>
                        認養寵物為：{pet.animal_colour + '的' + pet.animal_kind}
                    </Text>
                )
            })}
        </View>
    )
}
function ProfileDetailScreen() {
    return (
        <View style={styles.container}>
            <Text>ProfileDetailScreen</Text>
        </View>
    )
}
function HomeScreen(props) {
    const [food, setFood] = useState('candy')
    const [dataSource, setDataSource] = useState([])

    const changeFood = (foodGet) => {
        setFood(foodGet)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        let getAll = []

        dataSource.map((a) => {
            if (a.addToMyList === true) {
                getAll.push(a)
            }
        })

        saveToStorage(getAll)
    })

    const saveToStorage = async (getMyBooks) => {
        try {
            await StorageHelper.setMySetting(
                'myList',
                JSON.stringify(getMyBooks)
            )
        } catch (err) {
            console.log(err)
        }
    }

    const fetchData = () => {
        const REQUEST_URL =
            'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL'

        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                setDataSource(responseData)
            })
            .catch((err) => {
                console.log('error 是 ', err)
            })
    }

    const showNoticeDetail = (cases) => {
        props.navigation.push('HomeDetailScreen', { passProps: cases })
    }

    const pressRow = (cases) => {
        const newDatas = dataSource.map((a) => {
            let copyA = { ...a }
            if (copyA.animal_id === cases.animal_id) {
                copyA.addToMyList = !copyA.addToMyList
            }

            return copyA
        })

        setDataSource(newDatas)
    }

    const renderBook = (cases) => {
        return (
            <TouchableOpacity onPress={() => showNoticeDetail(cases)}>
                <View>
                    <View style={styles.MainView}>
                        <TouchableOpacity onPress={() => pressRow(cases)}>
                            {cases.addToMyList === true ? (
                                <Image
                                    style={styles.imageCheck}
                                    source={require('./src/img/heart.png')}
                                />
                            ) : (
                                <Image
                                    style={styles.imageCheck}
                                    source={require('./src/img/heart-empty.png')}
                                />
                            )}
                        </TouchableOpacity>
                        <Image
                            source={{
                                uri: cases.album_file
                                    ? cases.album_file
                                    : 'https://pic.pimg.tw/cc1895/1431185098-1614666523.jpg',
                            }}
                            style={styles.thumbnail}
                        />

                        <View style={{ flex: 1 }}>
                            <Text
                                ellipsizeMode='tail'
                                numberOfLines={3}
                                style={{
                                    color: 'black',
                                    fontSize: 15,
                                    marginTop: 8,
                                }}
                            >
                                {cases.animal_place}
                            </Text>

                            <Text
                                ellipsizeMode='tail'
                                numberOfLines={3}
                                style={{
                                    marginTop: 8,
                                    fontSize: 13,
                                    marginBottom: 8,
                                }}
                            >
                                {cases.animal_bodytype === 'MEDIUM'
                                    ? '中型'
                                    : cases.animal_bodytype === 'SMALL'
                                    ? '小型'
                                    : '大型'}
                                {'/' +
                                    cases.animal_colour +
                                    '的' +
                                    cases.animal_kind}
                            </Text>
                        </View>
                        <Image
                            source={require('./src/img/next.png')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.seperator} />
                </View>
            </TouchableOpacity>
        )
    }
    const [showData, setShowData] = useState()
    useEffect(() => {
        setShowData(dataSource)
    }, [dataSource])

    return (
        <View>
            <FilterData data={dataSource} setShowData={setShowData} />
            <FlatList
                data={showData}
                renderItem={(cases) => renderBook(cases.item)}
                keyExtractor={(cases) => cases.animal_id.toString()}
                style={{ backgroundColor: 'white' }}
            />
        </View>
    )
}
function MyHomeStack() {
    return (
        <Stack.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{
                headerStyle: { backgroundColor: 'tomato' },
                headerBackTitle: '返回',
                headerTintColor: 'white',
            }}
        >
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen
                name='HomeDetailScreen'
                component={HomeDetailScreen}
                options={{ title: 'My Detail' }}
            />
        </Stack.Navigator>
    )
}

function MyProfileStack() {
    return (
        <Stack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerStyle: { backgroundColor: 'tomato' },
                headerBackTitle: '返回2',
                headerTintColor: 'white',
            }}
        >
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen
                name='ProfileDetail'
                component={ProfileDetailScreen}
                options={{ title: 'My Detail2' }}
            />
        </Stack.Navigator>
    )
}
const FilterData = (props) => {
    const { data, setShowData } = props

    const [filterType, setFilterType] = useState('')
    useEffect(() => {
        if (filterType !== '') {
            let d = data.filter((r) => r.animal_colour === filterType)
            console.log(d)
            setShowData(d)
        }
    }, [filterType])

    useEffect(() => {
        // console.log(data.map((r) => r.animal_colour))
    }, [data])

    const filterData = (tag) => {
        // setShowData(data)
        setFilterType(tag)
    }
    return (
        <View style={styles.tags}>
            {['白色', '棕色', '虎斑色', '黑黃色', '黃色', '花色'].map((r) => {
                return (
                    <TouchableOpacity
                        key={r}
                        style={styles.tag}
                        onPress={() => filterData(r)}
                    >
                        <Text style={styles.TagText}>{r}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
export default function App() {
    useEffect(() => {
        console.log(data.length)
    }, [])
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, focused }) => {
                        let iconName
                        if (route.name == 'Home') {
                            iconName = focused
                                ? 'ios-trophy'
                                : 'ios-information-circle-outline'
                        } else if (route.name == 'Settings') {
                            iconName = focused ? 'ios-options' : 'ios-list'
                        }
                        return (
                            <Ionicons name={iconName} size={25} color={color} />
                        )
                    },
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                    headerShown: false,
                })}
            >
                <Tab.Screen name='Home' component={MyHomeStack} />
                <Tab.Screen name='Settings' component={MyProfileStack} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MainView: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 8,
    },
    seperator: {
        height: 1,
        backgroundColor: '#dddddd',
    },
    thumbnail: {
        width: 50,
        height: 60,
        marginRight: 10,
    },
    imgChecked: {
        width: 22,
        height: 22,
        marginRight: 10,
    },
    tags: {
        flexDirection: 'row',
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 6,
        marginRight: 6,
    },
    tag: {
        borderColor: 'black',
        borderWidth: 2,
        width: 80,
        height: 30,
        borderRadius: 30,
        marginRight: 6,
    },
    TagText: {
        textAlign: 'center',
    },
})
