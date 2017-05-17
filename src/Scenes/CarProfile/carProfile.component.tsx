import React, { Component } from 'react';
import { connect } from '../../Utils/connect';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import ScrollableTabView from '../../Components/react-native-scrollable-tab-view/';
import ScrollableTabBar from '../../Components/react-native-scrollable-tab-view/ScrollableTabBar';

import { styles } from './carProfile.styles';
import { Info } from './info/info.component';
import { Overview } from './overview/overview.component';
import { CarTimeline } from './carTimeline/carTimeline.component';
import { ShowCase } from './showcase/showcase.component';
import { TechSpec } from './techSpec/techSpec.component';
import { FitImage } from '../../Components/FitImage/FitImage.component';
import { getCarById, setBrowsingCar, getCarTimelineContent, followCar, unFollowCar, getCarFollowersCount } from '../../Actions/cars';
import { getUserFollowingFeeds } from '../../Actions/user';
import { setTimeline } from '../../Actions/timeline';
import { BackScene } from '../';
import { LoadingView } from '../../Components/LoadingView';

import palette from '../../Styles/Themes/palette';
import background from '../../Styles/Themes/background';

const getTimeline = (timelines, carInfoIdArg) => {
  const timelineDetails = timelines.find(({ carInfoId }) => carInfoId === carInfoIdArg);
  return timelineDetails ? timelineDetails.timeline : [];
};

const stateToProps = ({ user, cars, timelines, loadingStatus }) => ({ user, cars, timelines, loadingStatus });

@connect(stateToProps)
export class CarProfile extends Component<any, any> {

  private scrollableTabView: {};

  constructor(props) {
    super(props);

    const { car, carInfoId, cars, user, dispatch, timelines = [] } = this.props;
    let timeline = [];
    if (car && !cars.browsingCars.find(item => item.carInfo.id === car.carInfo.id)) {
      const ownerInfo = {
        userId: user.id,
        name: user.name,
        image: user.profileImg
      }
      dispatch(setBrowsingCar(car.carInfo, ownerInfo));
      getTimeline(timelines, car.carInfo.id);
      if (!timeline.length) {
        dispatch(setTimeline('car', car.carInfo.id));
      }
    }
    else {
      if (carInfoId) {
        dispatch(getCarById(carInfoId));
        getTimeline(timelines, carInfoId);
        if (!timeline.length) {
          dispatch(setTimeline('car', carInfoId));
        }
      }
    }

    if (user.follows.length === 0) {
      dispatch(getUserFollowingFeeds(user.id))
    }
  }

  componentWillReceiveProps({ cars, timelines = [] }) {
    const { dispatch, car, carInfoId } = this.props;
    let browsingCarId = 0;
    car ? browsingCarId = car.carInfo.id : browsingCarId = carInfoId;
    const browsingCar = cars.browsingCars.find(item => item.carInfo.id === browsingCarId);

    if (browsingCar) {
      if (browsingCar.carStats.followersCount.loadPending) {
        dispatch(getCarFollowersCount(browsingCarId));
      }
      if (browsingCar.carImages.loadPending) {
        dispatch(getCarTimelineContent(browsingCarId, 'Images', 0));
      }
      if (browsingCar.carVideos.loadPending) {
        dispatch(getCarTimelineContent(browsingCarId, 'Videos', 0));
      }
    }
  }

  render() {

    return (
      <LoadingView style={styles.container}
        isLoading={this.props.loadingStatus.carsLoading}>
        {getCarProfileComponent(this.props)}
      </LoadingView>
    );
  }
}

const back = (navigator) => {
  navigator.pop()
}

const getCarProfileComponent = (props) => {
  const { user, car, carInfoId, cars, navigator, dispatch, rootNav, timelines } = props;

  let browsingCar;
  if (car) {
    browsingCar = cars.browsingCars.find(item => item.carInfo.id === car.carInfo.id)
  }
  else {
    browsingCar = cars.browsingCars.find(item => item.carInfo.id === carInfoId)
  }

  if (!browsingCar) {
    return null;
  }

  const { image } = browsingCar.carInfo;
  const owned = !!cars.userCars.find(userCar => userCar.carInfo.id === browsingCar.carInfo.id);
  let verified = false;
  if (owned) {
    const car = cars.userCars.find(userCar => userCar.carInfo.id === browsingCar.carInfo.id);
    verified = car.verified;
  }
  const followed = user.follows.includes(browsingCar.carInfo.id.toString());
  const timelineProps = { type: 'car', car: browsingCar, user, navigator, rootNav };

  const carTimelineItem = timelines.find(item => item.actorType === 'car' && item.actorId === browsingCar.carInfo.id);
  let timeline = null;
  if (carTimelineItem) {
    timeline = carTimelineItem.timeline;
  }

  const overViewProps = {
    tabView: this.scrollableTabView,
    timeline: timeline,
  };

  const userInfoComponent = (
    <View style={{ backgroundColor: background.carProfile }}>
      <View style={styles.infoWrapper}>
        <View style={styles.imageWrapper}>
          <FitImage source={{ uri: image }} round={true} />
        </View>

        <Info owned={owned}
          car={browsingCar}
          onSettingsPress={() => console.log("Settings")}
          followed={followed}
          onFollowPress={() => dispatch(followCar(user.id, browsingCar.carInfo.id))}
          onUnFollowPress={() => dispatch(unFollowCar(user.id, browsingCar.carInfo.id))}
          verified={verified}
          onVerifyPress={() => navigator.push({ id: 'verify' })} />

      </View>
      <View style={styles.carModelWrapper}>
        <Text style={styles.carName}>{browsingCar.carInfo.car.model}</Text>
        <Text style={[styles.carName, styles.carYear]}> {browsingCar.carInfo.car.yearOfManufacture}</Text>
      </View>
    </View>
  );

  return (
    <BackScene onBack={() => back(navigator)}
      title={browsingCar.carInfo.car.make + " " + browsingCar.carInfo.car.model}
      style={{ statusBar: { backgroundColor: background.carProfile } }}>

      <View style={{ flex: 1 }}>
        <ScrollableTabView
          ref={(tabView) => { this.scrollableTabView = tabView }}
          initialPage={0}
          tabBarActiveTextColor={palette.primary}
          tabBarInactiveTextColor={palette.inactive}
          tabBarUnderlineStyle={styles.underline}
          tabBarTextStyle={styles.tabText}
          tabBarBackgroundColor={background.carProfile}
          style={{ flex: 1 }}
          aboveBarComponent={userInfoComponent}
          renderTabBar={() => <ScrollableTabBar />}>

          <Overview tabLabel='OVERVIEW' {...overViewProps} timelineProps={timelineProps} />
          <CarTimeline tabLabel='TIMELINE' timelineProps={timelineProps} />
          <ShowCase tabLabel='SHOWCASE' carImages={browsingCar.carImages.content} carVideos={browsingCar.carVideos.content} />
          <TechSpec tabLabel='SPEC' car={car} />
        </ScrollableTabView>
      </View>
    </BackScene>
  );
}
