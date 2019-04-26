import React from "react";
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components";

import { red, orange, blue, lightPurp, pink } from "./colors";

const IconContainer = styled.View`
    padding: 5px;
    border-radius: 8px;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    background: ${props => props.background};
`;

export function isBetween(num, x, y) {
    if (num >= x && num <= y) {
        return true;
    }

    return false;
}

export function calculateDirection(heading) {
    let direction = "";

    if (isBetween(heading, 0, 22.5)) {
        direction = "North";
    } else if (isBetween(heading, 22.5, 67.5)) {
        direction = "North East";
    } else if (isBetween(heading, 67.5, 112.5)) {
        direction = "East";
    } else if (isBetween(heading, 112.5, 157.5)) {
        direction = "South East";
    } else if (isBetween(heading, 157.5, 202.5)) {
        direction = "South";
    } else if (isBetween(heading, 202.5, 247.5)) {
        direction = "South West";
    } else if (isBetween(heading, 247.5, 292.5)) {
        direction = "West";
    } else if (isBetween(heading, 292.5, 337.5)) {
        direction = "North West";
    } else if (isBetween(heading, 337.5, 360)) {
        direction = "North";
    } else {
        direction = "Calculating";
    }

    return direction;
}

export function timeToString(time = Date.now()) {
    const date = new Date(time);
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return todayUTC.toISOString().split("T")[0];
}

export function getMetricMetaInfo(metric) {
    const info = {
        run: {
            displayName: "Run",
            max: 50,
            unit: "miles",
            step: 1,
            type: "steppers",
            getIcon: function() {
                return (
                    <IconContainer background={red}>
                        <MaterialIcons name="directions-run" color="white" size={30} />
                    </IconContainer>
                );
            }
        },
        bike: {
            displayName: "Bike",
            max: 100,
            unit: "miles",
            step: 1,
            type: "steppers",
            getIcon: function() {
                return (
                    <IconContainer background={orange}>
                        <MaterialCommunityIcons name="bike" color="white" size={30} />
                    </IconContainer>
                );
            }
        },
        swim: {
            displayName: "Swim",
            max: 9900,
            unit: "meters",
            step: 100,
            type: "steppers",
            getIcon: function() {
                return (
                    <IconContainer background={blue}>
                        <MaterialCommunityIcons name="swim" color="white" size={30} />
                    </IconContainer>
                );
            }
        },
        sleep: {
            displayName: "Sleep",
            max: 24,
            unit: "hours",
            step: 1,
            type: "slider",
            getIcon: function() {
                return (
                    <IconContainer background={lightPurp}>
                        <FontAwesome name="bed" color="white" size={30} />
                    </IconContainer>
                );
            }
        },
        eat: {
            displayName: "Eat",
            max: 10,
            unit: "rating",
            step: 1,
            type: "slider",
            getIcon: function() {
                return (
                    <IconContainer background={pink}>
                        <MaterialCommunityIcons name="food" color="white" size={30} />
                    </IconContainer>
                );
            }
        }
    };

    return typeof metric === "undefined" ? info : info[metric];
}

export function getDailyReminderValue() {
    return {
        today: "🖐 Don't forget to log your data today!"
    };
}
