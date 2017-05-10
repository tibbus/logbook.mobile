var React = require('react');
const {
  Dimensions,
  View,
  Animated,
  ScrollView,
  Platform,
  StyleSheet,
  ViewPagerAndroid,
  InteractionManager,
} =  require('react-native');

class StaticContainer extends React.Component {

  shouldComponentUpdate(nextProps){
    return !!nextProps.shouldUpdate;
  }

  render() {
    var child = this.props.children;
    if (child === null || child === false) {
      return null;
    }

    return React.Children.only(child);
  }
}

module.exports = StaticContainer;
