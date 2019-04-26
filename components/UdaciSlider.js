import React from "react";
import { Text, Slider } from "react-native";

import { gray } from "../utils/colors";
import { Row, MetricCounter } from "./UdaciSteppers";

export default function UdaciSlider({ max, unit, step, value, onChange }) {
    return (
        <Row>
            <Slider style={{flex: 1}} step={step} value={value} maximumValue={max} minimumValue={0} onValueChange={onChange} />

            <MetricCounter>
                <Text style={{ fontSize: 24 }}>{value}</Text>
                <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
            </MetricCounter>
        </Row>
    );
}
