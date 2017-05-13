import React, { Component } from 'react';
import { connect } from '../../Utils/connect';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import ScrollableTabView from '../../Components/react-native-scrollable-tab-view/';
import ScrollableTabBar from '../../Components/react-native-scrollable-tab-view/ScrollableTabBar';

import { styles } from './carProfile.styles';
import { Info } from './info/info.component';
import { ShowCase } from './ShowCase';
import { TechSpec } from './TechSpec';
import { Overview } from './Overview';
import { SquareImage } from '../../Components/SquareImage';
import { getCarById, setBrowsingCar, getCarTimelineContent, followCar, unFollowCar, getCarFollowersCount } from '../../Actions/cars';
import { getUserFollowingFeeds } from '../../Actions/user';
import { setCarTimeline } from '../../Actions/timeline';
import { BackScene } from '../';
import { Timeline } from './Timeline'

import palette from '../../Styles/Themes/palette';
import background from '../../Styles/Themes/background';

const getTimeline = (timelines, carInfoIdArg) => {
  const timelineDetails = timelines.find(({ carInfoId }) => carInfoId === carInfoIdArg);
  return timelineDetails ? timelineDetails.timeline : [];
};

const stateToProps = ({ user, cars, timelines }) => ({ user, cars, timelines });

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
        dispatch(setCarTimeline({ carInfoId: car.carInfo.id }));
      }
    }
    else {
      if (carInfoId) {
        dispatch(getCarById(carInfoId));
        getTimeline(timelines, carInfoId);
        if (!timeline.length) {
          dispatch(setCarTimeline({ carInfoId: carInfoId }));
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

  back(navigator) {
    navigator.pop()
  }

  render() {
    const { user, car, carInfoId, cars, navigator, dispatch, rootNav, timelines } = this.props;

    let browsingCar;
    if (car) {
      browsingCar = cars.browsingCars.find(item => item.carInfo.id === car.carInfo.id)

      if (!browsingCar) {
        return (
          <View>
            <Text>Loading</Text>
          </View>
        );
      }
    }
    else {
      browsingCar = cars.browsingCars.find(item => item.carInfo.id === carInfoId)

      if (!browsingCar) {
        return (
          <View>
            <Text>Loading</Text>
          </View>
        );
      }
    }
    const { image } = browsingCar.carInfo;
    const owned = !!cars.userCars.find(userCar => userCar.carInfo.id === browsingCar.carInfo.id);
    let verified = false;
    if (owned) {
      const car = cars.userCars.find(userCar => userCar.carInfo.id === browsingCar.carInfo.id);
      verified = car.verified;
    }
    const followed = user.follows.includes(browsingCar.carInfo.id.toString())
    const timelineProps = { car: browsingCar, user, navigator, dispatch, rootNav }

    const carTimelineItem = timelines.find(timelineItem => timelineItem.carInfoId === browsingCar.carInfo.id)
    let timeline = null;
    if (carTimelineItem) {
      timeline = carTimelineItem.timeline;
    }

    const overViewProps = {
      tabView: this.scrollableTabView,
      timeline: timeline,
    }

    const userInfoComponent = (
      <View>
        <View style={styles.infoWrapper}>
          <View style={styles.imageWrapper}>
            <SquareImage source={{ uri: image }} />
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
          <Text style={styles.carName}>{car.carInfo.car.model}</Text>
          <Text style={[styles.carName, styles.carYear]}> {car.carInfo.car.yearOfManufacture}</Text>
        </View>
      </View>
    );

    return (
      <BackScene onBack={() => this.back(navigator)} title={browsingCar.carInfo.car.make + " " + browsingCar.carInfo.car.model}>
        <View style={{ flex: 1 }}>
          <ScrollableTabView
            ref={(tabView) => {this.scrollableTabView = tabView}}
            initialPage={0}
            tabBarActiveTextColor={palette.primary}
            tabBarInactiveTextColor={palette.inactive}
            tabBarUnderlineStyle={styles.underline}
            tabBarTextStyle={styles.tabText}
            tabBarBackgroundColor={background.color}
            style={{ flex: 1 }}
            aboveBarComponent={userInfoComponent}
            renderTabBar={() => <ScrollableTabBar />}
          >
            <Overview tabLabel='OVERVIEW' {...overViewProps} timelineProps={timelineProps} />
            <Timeline tabLabel='TIMELINE' {...timelineProps} />
            <ShowCase tabLabel='SHOWCASE' carImages={browsingCar.carImages.content} carVideos={browsingCar.carVideos.content} style={{ flex: 1 }} />
            <TechSpec tabLabel='SPEC' car={car} />
          </ScrollableTabView>
        </View>
      </BackScene>
    );
  }
}
