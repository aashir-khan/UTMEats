import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Spinner } from '../components/common';
import { VictoryArea, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import { ButtonGroup, Text } from 'react-native-elements';
import firebase from '@firebase/app';
import '@firebase/auth';
import axios from 'axios';

export default class PastEarnings extends React.Component {
  constructor(props) {
    super(props);

    this.week = [];
    this.month = [];
    this.year = [];

    this.totalWeeklyEarnings = {};
    this.totalMonthlyEarnings = {};
    this.totalYearlyEarnings = {};
    this.allEarnings = {};

    this.state = {
      loading: true,
      selectedButtonIndex: 0
    };

    this.userId = firebase.auth().currentUser.uid;
    this.updateIndex = this.updateIndex.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const earnings = await axios.get(
      'https://utmeats.herokuapp.com/order/getCarrierEarnings?userId=' + this.userId
    );

    this.week = earnings.data.weeklyEarnings;
    this.month = earnings.data.monthlyEarnings;
    this.year = earnings.data.yearlyEarnings;

    this.totalWeeklyEarnings = earnings.data.totalWeeklyEarnings;
    this.totalMonthlyEarnings = earnings.data.totalMonthlyEarnings;
    this.totalYearlyEarnings = earnings.data.totalYearlyEarnings;
    this.allEarnings = earnings.data.allEarnings;

    this.setState({
      data: this.week,
      loading: false
    });
  }

  updateIndex(selectedButtonIndex) {
    let newData = this.week;

    if (selectedButtonIndex == 1) newData = this.month;
    else if (selectedButtonIndex == 2) newData = this.year;

    this.setState({
      selectedButtonIndex,
      data: newData
    });
  }

  render() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    const buttons = ['Week', 'Month', 'Year'];
    const { selectedButtonIndex } = this.state;

    let graphLabel = 'Day';

    if (selectedButtonIndex == 2) graphLabel = 'Month';

    let totalInfo;
    let totalLabel;

    if (selectedButtonIndex == 0) {
      totalInfo = this.totalWeeklyEarnings;
      totalLabel = 'Weekly Earnings';
    } else if (selectedButtonIndex == 1) {
      totalInfo = this.totalMonthlyEarnings;
      totalLabel = 'Monthly Earnings';
    } else {
      totalInfo = this.totalYearlyEarnings;
      totalLabel = 'Yearly Earnings';
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.total}>
            <Text h3 style={styles.totalHeader}>
              Total Earnings
            </Text>
            <Text style={styles.totalSubheadings}>Delivery: ${this.allEarnings.delivery}</Text>
            <Text style={styles.totalSubheadings}>Tips: ${this.allEarnings.tip}</Text>
          </View>

          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedButtonIndex}
            buttons={buttons}
            containerStyle={{ height: 40 }}
          />

          <View style={styles.total}>
            <Text h3 style={styles.totalHeader}>
              {totalLabel}
            </Text>
            <Text style={styles.totalSubheadings}>
              Delivery: ${totalInfo && totalInfo.delivery}
            </Text>
            <Text style={styles.totalSubheadings}>Tips: ${totalInfo && totalInfo.tip}</Text>
          </View>

          {totalInfo.delivery + totalInfo.tip > 0 && (
            <VictoryChart domainPadding={{ x: 5 }}>
              <VictoryAxis
                theme={VictoryTheme.material}
                standalone={false}
                tickCount={15}
                label={graphLabel}
                style={{
                  tickLabels: { fill: '#8494A5' },
                  axis: { stroke: 'none' },
                  axisLabel: { fontSize: 15, padding: 30 }
                }}
              />

              <VictoryAxis
                dependentAxis
                theme={VictoryTheme.material}
                standalone={false}
                style={{
                  tickLabels: { fill: '#8494A5' },
                  axis: { stroke: 'none' }
                }}
                tickFormat={t => `$${t}`}
              />

              <VictoryArea
                data={this.state.data}
                interpolation="cardinal"
                padding={0}
                style={{
                  data: {
                    fill: 'white',
                    stroke: '#1E93FA',
                    strokeWidth: 3
                  }
                }}
              />
            </VictoryChart>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  total: {
    paddingBottom: 20
  },
  totalHeader: {
    textAlign: 'center'
  },
  totalSubheadings: {
    textAlign: 'center',
    fontSize: 20
  }
});
