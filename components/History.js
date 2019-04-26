import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import UdaciFitnessCalendar from "udacifitness-calendar";

import { receiveEntries, addEntry } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalendarResults } from "../utils/API";

class History extends React.Component {
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
            });
    }

    renderItem = ({ today, ...metrics }, formattedDate, key) => {
        return <View>{today ? <Text>{JSON.stringify(today)}</Text> : <Text>{JSON.stringify(metrics)}</Text>}</View>;
    };

    renderEmptyDate(formattedDate) {
        return (
            <View>
                <Text>No Data for this day</Text>
            </View>
        );
    }

    render() {
        const { entries } = this.props;
        return (
            <Text>{JSON.stringify(entries)}</Text>
            // <UdaciFitnessCalendar
            //     items={entries}
            //     renderItem={this.renderItem}
            //     renderEmptyDate={this.renderEmptyDate}
            // />
        );
    }
}

function mapStateToProps(entries) {
    return {
        entries
    };
}

export default connect(mapStateToProps)(History);
