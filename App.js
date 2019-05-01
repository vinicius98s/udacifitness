import * as React from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

import { purple, white } from './utils/colors'
import { setLocalNotification } from './utils/helpers'

import reducer from './reducers'

import Live from './components/Live'
import History from './components/History'
import AddEntry from './components/AddEntry'
import EntryDetail from './components/EntryDetail'

function UdaciStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const Tabs = createBottomTabNavigator(
	{
		History: {
			screen: History,
			navigationOptions: {
				tabBarLabel: 'History',
				tabBarIcon: ({ tintColor }) => <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
			}
		},
		AddEntry: {
			screen: AddEntry,
			navigationOptions: {
				tabBarLabel: 'Add Entry',
				tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
			}
		},
		Live: {
			screen: Live,
			navigationOptions: {
				tabBarLabel: 'Live',
				tabBarIcon: ({ tintColor }) => <Ionicons name="ios-speedometer" size={30} color={tintColor} />
			}
		}
	},
	{
		navigationOptions: {
			header: null
		},
		tabBarOptions: {
			activeTintColor: purple,
			style: {
				height: 56,
				backgroundColor: white,
				shadowColor: 'rgba(0, 0, 0, 0.24)',
				shadowOffset: {
					width: 0,
					height: 3
				},
				shadowRadius: 6,
				shadowOpacity: 1,
				elevation: 1
			}
		}
	}
)

const MainNavigator = createStackNavigator({
	Home: {
		screen: Tabs
	},
	EntryDetail: {
		screen: EntryDetail,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			},
			headerForceInset: { top: 'never', bottom: 'never' }
		}
	}
})

const AppNavigation = createAppContainer(MainNavigator)

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification()
	}

	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{ flex: 1 }}>
					<UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
					<AppNavigation />
				</View>
			</Provider>
		)
	}
}
