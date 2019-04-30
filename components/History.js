import React from "react";
import { View, Platform } from "react-native";
import { connect } from "react-redux";
import UdaciFitnessCalendar from "udacifitness-calendar";
import styled from "styled-components/native";
import { AppLoading } from "expo";

import DateHeader from "./DateHeader";
import MetricCard from "./MetricCard";

import { receiveEntries, addEntry } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalendarResults } from "../utils/API";

class History extends React.Component {
    state = {
        ready: false
    };

    componentDidMount() {
        const { dispatch } = this.props;

        fetchCalendarResults()
            .then(entries => dispatch(receiveEntries(entries)))
            .then(({ entries }) => {
                if (!entries[timeToString()]) {
                    dispatch(
                        addEntry({
                            [timeToString()]: getDailyReminderValue()
                        })
                    );
                }
            })
            .then(this.setState({ ready: true }));
    }

    renderItem = ({ today, ...metrics }, formattedDate, key) => {
        return (
            <StyledDayItem platform={Platform.OS}>
                {today ? (
                    <View>
                        <DateHeader date={formattedDate} />
                        <NoDataText>{today}</NoDataText>
                    </View>
                ) : (
                    <StyledItemButton onPress={() => this.props.navigation.navigate("EntryDetail", { entryId: key })}>
                        <MetricCard metrics={metrics} date={formattedDate} />
                    </StyledItemButton>
                )}
            </StyledDayItem>
        );
    };

    renderEmptyDate(formattedDate) {
        return (
            <StyledDayItem platform={Platform.OS}>
                <DateHeader date={formattedDate} />
                <NoDataText>You didn't log any data for this day.</NoDataText>
            </StyledDayItem>
        );
    }

    render() {
        const { entries } = this.props;
        const { ready } = this.state;

        if (!ready) {
            return <AppLoading />;
        }

        return <UdaciFitnessCalendar items={entries} renderItem={this.renderItem} renderEmptyDate={this.renderEmptyDate} />;
    }
}

const NoDataText = styled.Text`
    font-size: 20px;
    margin-top: 10px;
`;

const StyledItemButton = styled.TouchableOpacity``;

const StyledDayItem = styled.View`
    ${props =>
        props.platform === "android"
            ? `
            border-radius: 2px;
            elevation: 1px;
        `
            : ""}
    ${props =>
        props.platform === "ios"
            ? `
            border-radius: 16px;
            shadow-color: rgba(0, 0, 0, 0.25);
            shadow-offset: 0px 3px;
            shadow-opacity: 1;
            shadow-radius: 3px;
        `
            : ""}
    background-color: white;
    padding: 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 7.5px;
    margin-bottom: 7.5px;
    justify-content: center;
`;

function mapStateToProps(entries) {
    return {
        entries
    };
}

export default connect(mapStateToProps)(History);
