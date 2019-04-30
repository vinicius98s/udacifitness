import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";

import TextButton from "./TextButton";

import { white } from "../utils/colors";
import { addEntry } from "../actions";
import { removeEntry } from "../utils/API";
import { timeToString, getDailyReminderValue } from "../utils/helpers";

import MetricCard from "./MetricCard";

class EntryDetail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { entryId } = navigation.state.params;

        const year = entryId.slice(0, 4);
        const month = entryId.slice(5, 7);
        const day = entryId.slice(8);

        return {
            title: `${month}/${day}/${year}`
        };
    };

    reset = () => {
        const { remove, goBack, entryId } = this.props;

        remove();
        goBack();
        removeEntry(entryId);
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.metrics !== null && !nextProps.metrics.today;
    }

    render() {
        const { metrics } = this.props;

        return (
            <Container background={white}>
                <MetricCard metrics={metrics} />
                <TextButton onPress={this.reset} style={{ marginTop: 20 }}>
                    RESET
                </TextButton>
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    background: ${props => props.background};
    padding: 10px;
`;

function mapStateToProps(state, { navigation }) {
    const { entryId } = navigation.state.params;

    return {
        entryId,
        metrics: state[entryId]
    };
}

function mapDispatchToProps(dispatch, { navigation }) {
    const { entryId } = navigation.state.params;

    return {
        remove: () =>
            dispatch(
                addEntry({
                    [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
                })
            ),
        goBack: () => navigation.goBack()
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EntryDetail);
