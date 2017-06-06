import React, { Component } from 'react';
import { connect } from '../../Utils/connect';
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import ScrollableTabView from '../../Components/react-native-scrollable-tab-view/';
import ScrollableTabBar from '../../Components/react-native-scrollable-tab-view/ScrollableTabBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './carProfile.styles';
import { Info } from './info/info.component';
import { Overview } from './overview/overview.component';
import { CarTimeline } from './carTimeline/carTimeline.component';
import { ShowCase } from './showcase/showcase.component';
import { TechSpec } from './techSpec/techSpec.component';
import { FitImage } from '../../Components/FitImage/FitImage.component';
import { getCarById, setBrowsingCar, getCarTimelineContent, followCar, unFollowCar, getCarFollowersCount, updateProfileImage } from '../../Actions/cars';
import { getUserFollowingFeeds } from '../../Actions/user';
import { setTimeline } from '../../Actions/timeline';
import { BackScene } from '../';
import { LoadingView } from '../../Components/LoadingView';
import ImagePicker from 'react-native-image-picker';
import { paramsToObj } from '../../Utils';

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

const getCameraIconComponent = (carInfoId, onProfileImageUpdate) => {
  return (
      <TouchableOpacity onPress={() => onCameraClick(carInfoId, onProfileImageUpdate)}>
        <Icon name='camera' style={styles.icon} />
      </TouchableOpacity>
  )
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
  const timelineProps = { type: 'car', car: browsingCar, user, navigator, rootNav, requestPending: true };

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
    <View style={styles.infoWrapper}>
      <View style={styles.subWrapper}>
        <View style={styles.imageWrapper}>
          <FitImage style={styles.carProfileImage} source={{ uri: image }} round={true}>
            <View style={styles.iconWrapper}>
              { owned ? getCameraIconComponent(car.carInfo.id, (carInfoId, profileImageRequest) => dispatch(updateProfileImage(carInfoId, profileImageRequest))) : null}
            </View>
          </FitImage>
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
        <Text style={[styles.carName, styles.carModel]}>{browsingCar.carInfo.car.model}</Text>
        <Text style={[styles.carName, styles.carYear]}> {browsingCar.carInfo.car.yearOfManufacture}</Text>
      </View>
    </View>
  );

  return (
    <BackScene onBack={() => back(navigator)}
      title={browsingCar.carInfo.car.make + " " + browsingCar.carInfo.car.model}
      style={{ statusBar: { backgroundColor: background.carProfile } }}>

      <View style={styles.container}>
        <ScrollableTabView
          ref={(tabView) => { this.scrollableTabView = tabView }}
          initialPage={0}
          locked={true}
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
          <TechSpec tabLabel='SPECS' car={browsingCar} />
        </ScrollableTabView>
      </View>
    </BackScene>
  );
}

const onCameraClick = (carInfoId, onProfileImageUpdate) => {
    const options = { mediaType: 'photo' };
    const title = 'Photos';
    const titleLiveCapture = 'Take a photo...';
    const config: any = {
      ...options,
      title,
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      takePhotoButtonTitle: titleLiveCapture,
      quality: 0.2
    };

    ImagePicker.showImagePicker(config, (response) => {
      const { didCancel, error, data, uri = '', origURL = '' } = response;

      if (!origURL && !uri) {
        return;
      } else if (didCancel) {
        console.log(response);
      } else if (error) {
        console.log(response);
      }

      const params: any = getParams(origURL, uri);

      if (!params) {
        throw new Error('Error: Invalid file.');
      }

      const contentData = {
        id: params.id,
        extension: params.ext,
        type: 'image',
        uri: uri
      };

      onProfileImageUpdate(carInfoId, contentData);
    });
  }

const getParams = (origURL, uri) => {
  if (origURL) {
    return paramsToObj(origURL)
  }

  // @TODO check how last keyword is working
  const ext = uri.split('.').pop();
  return {
    ext,
    id: 'anonymous',
    uri
  }
}
