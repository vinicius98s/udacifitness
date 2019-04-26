import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducers";

import History from "./components/History";
import AddEntry from "./components/AddEntry";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 20 }} />
                    <History />
                </View>
            </Provider>
        );
    }
}
