import React from "react";
import { View, Text, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components";

import { purple, white, gray } from "../utils/colors";

export default function UdaciSteppers({ max, unit, step, value, onIncrement, onDecrement }) {
    return (
        <Row>
            <StepperBtn platform={Platform.OS} onPress={onDecrement}>
                <FontAwesome name="minus" color={Platform.OS === "android" ? "white" : "black"} size={20} />
            </StepperBtn>

            <StepperBtn platform={Platform.OS} onPress={onIncrement}>
                <FontAwesome name="plus" color={Platform.OS === "android" ? "white" : "black"} size={20} />
            </StepperBtn>

            <MetricCounter>
                <Text style={{ fontSize: 24 }}>{value}</Text>
                <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
            </MetricCounter>
        </Row>
    );
}

export const Row = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
`;

const StepperBtn = styled.TouchableOpacity`
    ${props =>
        props.platform === "android"
            ? `
        background: ${purple};
        padding: 10px;
        border-radius: 2px;
        margin: 5px;
    `
            : null}

    ${props =>
        props.platform === "ios"
            ? `
        background: ${white};
        border: 1px ${purple} solid;
        padding: 5px 25px;
        border-radius: 3px;
    `
            : null}
`;

export const MetricCounter = styled.View`
    width: 80px;
    align-self: flex-end;
    align-items: center;
    margin-left: auto;
`;
