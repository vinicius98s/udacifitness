import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

import DateHeader from "./DateHeader";

import { getMetricMetaInfo } from "../utils/helpers";
import { gray } from "../utils/colors";

export default function MetricCard({ date, metrics }) {
    return (
        <View>
            {date && <DateHeader date={date} />}
            {Object.keys(metrics).map(metric => {
                const { getIcon, displayName, unit, backgroundColor } = getMetricMetaInfo(metric);

                return (
                    <StyledMetric key={metric}>
                        {getIcon()}
                        <View>
                            <Text style={{ fontSize: 20 }}>{displayName}</Text>
                            <Text style={{ fontSize: 16, color: gray }}>
                                {metrics[metric]} {unit}
                            </Text>
                        </View>
                    </StyledMetric>
                );
            })}
        </View>
    );
}

const StyledMetric = styled.View`
    flex-direction: row;
    margin-top: 12px;
`;
