const colors = {
  primary: 'rgb(20, 20, 20)',
  secondary: 'rgb(134, 147, 158)',
  background: 'rgb(255,255,255)'
};

const input = {
  inputStyle: {
    fontSize: 16,
    marginLeft: 5
  },
  inputContainerStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    shadowColor: 'rgba(0,0,0,0)',
    shadowOffset: { width: 0, height: 0 },
    marginLeft: -10,
    marginRight: -10,
    margin: 5,
    padding: 5
  },
  containerStyle: {
    marginTop: 5,
    marginBottom: 10
  },
  leftIconContainerStyle: {
    marginRight: 5
  }
};

const button = {
  buttonStyle: {
    borderRadius: 20,
    borderWidth: 0.5,
    marginTop: 15,
    padding: 15
  },
  titleStyle: {
    marginLeft: 5
  }
};

const container = {
  backgroundColor: colors.background,
  padding: 50,
  paddingTop: 20
};

const header = {
  headerTintColor: { color: colors.secondary },
  headerTintColor: colors.secondary,
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  }
};

const tabBarOptions = {
  inactiveTintColor: 'rgba(0,0,0,0.3)',
  activeTintColor: colors.primary,
  labelStyle: {
    fontSize: 12
  },
  iconStyle: {
    width: 30,
    height: 30
  },
  tabStyle: {
    borderRightColor: 'rgb(240,240,240)',
    borderRightWidth: 1,
    borderLeftColor: 'rgb(240,240,240)',
    borderLeftWidth: 1
  },
  style: {
    backgroundColor: colors.background,
    height: 70
  },
  showLabel: false
};

const datePicker = {
  width: 170,
  padding: 10,
  borderRadius: 20,
  borderWidth: 1,
  borderBottomWidth: 1,
  borderTopWidth: 1,
  borderColor: 'rgba(0,0,0,.1)',
  shadowColor: 'rgba(0,0,0,0)'
};

const datePickerCustom = {
  dateInput: {
    borderColor: 'rgba(0,0,0,0)',
    shadowColor: 'rgba(0,0,0,0)',
    alignItems: 'flex-start'
  },
  dateText: {
    fontSize: 16,
    marginLeft: 5,
    color: 'rgba(0,0,0,1)'
  },
  placeholderText: {
    fontSize: 16,
    marginLeft: 5,
    color: 'rgba(0,0,0,0.35)'
  }
};

const themeProvider = {};

const icon = {
  margin: 5
};

const buttonIcon = {
  marginRight: 10,
  marginLeft: 10
};

const divider = {
  backgroundColor: 'rgba(0,0,0,0.2)',
  marginTop: 10
};

const listItem = {
  titleStyle: { fontSize: 18, fontWeight: 'bold' },
  leftAvatar: {
    rounded: false,
    size: 'large',
    style: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(0,0,0,0)'
    },
    overlayContainerStyle: {
      backgroundColor: 'rgba(0,0,0,0)'
    },
    avatarStyle: {
      borderRadius: 15
    }
  }
};

export default {
  colors: colors,
  container: container,
  datePicker: datePicker,
  datePickerCustom: datePickerCustom,
  Input: input,
  Button: button,
  Header: header,
  TabBarOptions: tabBarOptions,
  ThemeProvider: themeProvider,
  Divider: divider,
  Icon: icon,
  ListItem: listItem
};
