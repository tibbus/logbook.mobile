package com.mycarbioapp;

import android.app.Application;

import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this){

        @Override
        public String getJSMainModuleName() {
            return "D:\\PersonalProjects\\mycarbio.mobile\\index.android";
        }

        /**
        * Returns whether dev mode should be enabled.
        * This enables e.g. the dev menu.
        */
        @Override
        protected boolean getUseDeveloperSupport() {
            return true;
        }

        /**
        * A list of packages used by the app. If the app uses additional views
        * or modules besides the default ones, add more packages here.
        */
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new ReactVideoPackage(),
                new VectorIconsPackage(),
                new ImagePickerPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}