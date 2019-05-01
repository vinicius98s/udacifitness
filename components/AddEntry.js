import React, { Component } from 'react'
import { Text, Platform } from 'react-native'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { addEntry } from '../actions'
import {
	getMetricMetaInfo,
	timeToString,
	getDailyReminderValue,
	clearLocalNotification,
	setLocalNotification
} from '../utils/helpers'
import { submitEntry, removeEntry } from '../utils/API'
import { purple } from '../utils/colors'

import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import TextButton from './TextButton'

function SubmitBtn({ onPress }) {
	return (
		<SubmitButton platform={Platform.OS} onPress={onPress}>
			<SubmitTextButton>SUBMIT</SubmitTextButton>
		</SubmitButton>
	)
}

class AddEntry extends Component {
	state = {
		run: 0,
		bike: 0,
		swim: 0,
		sleep: 0,
		eat: 0
	}
	increment = (metric) => {
		const { max, step } = getMetricMetaInfo(metric)

		this.setState((state) => {
			const count = state[metric] + step

			return {
				...state,
				[metric]: count > max ? max : count
			}
		})
	}
	decrement = (metric) => {
		this.setState((state) => {
			const count = state[metric] - getMetricMetaInfo(metric).step

			return {
				...state,
				[metric]: count < 0 ? 0 : count
			}
		})
	}
	slide = (metric, value) => {
		this.setState(() => ({
			[metric]: value
		}))
	}
	submit = () => {
		const key = timeToString()
		const entry = this.state

		this.props.dispatch(
			addEntry({
				[key]: entry
			})
		)

		this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }))

		this.toHome()

		submitEntry({ key, entry })

		clearLocalNotification().then(setLocalNotification)
	}
	reset = () => {
		const key = timeToString()

		this.props.dispatch(
			addEntry({
				[key]: getDailyReminderValue()
			})
		)

		this.toHome()

		removeEntry(key)
	}

	toHome = () => {
		this.props.navigation.dispatch(
			NavigationActions.back({
				key: 'AddEntry'
			})
		)
	}

	render() {
		const metaInfo = getMetricMetaInfo()

		if (this.props.alreadyLogged) {
			return (
				<Center>
					<Ionicons name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'} size={100} />
					<Text style={{ paddingTop: 20, paddingBottom: 20 }}>
						You already logged your information for today.
					</Text>
					<TextButton onPress={this.reset}>Reset</TextButton>
				</Center>
			)
		}

		return (
			<Container>
				<DateHeader date={new Date().toLocaleDateString()} />
				{Object.keys(metaInfo).map((key) => {
					const { getIcon, type, ...rest } = metaInfo[key]
					const value = this.state[key]

					return (
						<Row key={key}>
							{getIcon()}
							{type === 'slider' ? (
								<UdaciSlider value={value} onChange={(value) => this.slide(key, value)} {...rest} />
							) : (
								<UdaciSteppers
									value={value}
									onIncrement={() => this.increment(key)}
									onDecrement={() => this.decrement(key)}
									{...rest}
								/>
							)}
						</Row>
					)
				})}
				<SubmitBtn onPress={this.submit} />
			</Container>
		)
	}
}

function mapStateToProps(state) {
	const key = timeToString()

	return {
		alreadyLogged: state[key] && typeof state[key].today === 'undefined'
	}
}

export default connect(mapStateToProps)(AddEntry)

const Center = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	margin-left: 30px;
	margin-right: 30px;
`

const Row = styled.View`
	flex-direction: row;
	flex: 1;
	align-items: center;
`

const Container = styled.View`
	flex: 1;
	background: white;
	padding: 20px;
`

const SubmitButton = styled.TouchableOpacity`
	background: ${purple};
	padding: 10px;
	height: 45px;
	${(props) =>
		props.platform === 'android'
			? `
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 2px;
    align-self: flex-end;
    justify-content: center;
    align-items: center;
  `
			: ''}
	${(props) =>
		props.platform === 'ios'
			? `
    border-radius: 7px;
    margin-left: 40px;
    margin-right: 40px;
  `
			: ''}
`

const SubmitTextButton = styled.Text`
	color: white;
	font-size: 20px;
	text-align: center;
`
