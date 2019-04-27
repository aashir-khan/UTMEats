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
  }
};

const keyboardAwareScrollView = {
  backgroundColor: colors.background
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
  inactiveTintColor: 'rgba(255,255,255,0.3)',
  activeTintColor: 'rgba(255,255,255,0.9)',
  labelStyle: {
    fontSize: 12
  },
  iconStyle: {
    width: 30,
    height: 30
  },
  style: {
    backgroundColor: colors.primary,
    height: 70,
    padding: 10
  },
  showLabel: false,
};

export default {
  colors: colors,
  Input: input,
  Button: button,
  KeyboardAwareScrollView: keyboardAwareScrollView,
  Header: header,
  TabBarOptions: tabBarOptions
};
