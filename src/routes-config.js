import React from 'react'
import {StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {View} from 'react-native'
import {Router, Scene, Reducer } from 'react-native-router-flux'
import TabIcon from './shared/tabIcon'

import Recommend from './pages/recommend/'
import RecommendResult from './pages/recommend/RecommendResult'
import Search from './pages/search/'
import SearchResult from './pages/search/SearchResult'
import My from './pages/my/'
import WebInnerView from './pages/WebInnerView'

const reducerCreate = (params) => {
  const defaultReducer = Reducer(params)
  return (state, action) => defaultReducer(state, action)
}

const RouterWithRedux = connect()(Router)

export default function configRoutes() {
  return (
    <View style={styles.appContainer}>
      <RouterWithRedux createReducer={reducerCreate} sceneStyle={styles.sceneStyle} titleStyle={styles.titleStyle} navigationBarStyle={styles.navigationBarStyle}>
      <Scene key="index">
        <Scene key="tabbar" tabs={true} tabBarIconContainerStyle={styles.tabBarIconContainerStyle} >
            <Scene key="recommend" initial={true} title="找对药" icon={TabIcon}>
              <Scene key="recommendPage" component={Recommend} title="找对药" sceneStyle={styles.sceneContentStyle}/>
              <Scene key="recommendResult" component={RecommendResult} rightTitle="筛选" rightButtonTextStyle={styles.titleStyle} onRight={()=>alert("筛选")} hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
            </Scene>
            <Scene key="search" icon={TabIcon} title="检索">
              <Scene key="searchPage" component={Search} title="检索" sceneStyle={styles.sceneContentStyle}/>
              <Scene key="searchResult" component={SearchResult} rightTitle="筛选" rightButtonTextStyle={styles.titleStyle} onRight={()=>alert("筛选")} hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
            </Scene>
            <Scene key="my" icon={TabIcon} title="我的">
              <Scene key="myPage" component={My} title="我的" sceneStyle={styles.sceneContentStyle}/>
              <Scene key="webInnerView" component={WebInnerView} title="WebView..." hideTabBar={true} sceneStyle={[styles.sceneContentStyle, styles.noTabBar]}/>
            </Scene>
        </Scene>
      </Scene>
    </RouterWithRedux>
  </View>)
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  sceneStyle: {
    backgroundColor: '#eff1f4'
  },
  navigationBarStyle: {
    backgroundColor: '#00a5ca',
  },
  titleStyle: {
    color: '#fff'
  },
  tabBarIconContainerStyle: {
    backgroundColor:'#f5f5f5',
    borderColor: '#ccc',
    borderTopWidth: .5
  },
  sceneContentStyle: {
    paddingTop: 64,
    paddingBottom: 50,
    backgroundColor: '#f0f1f4'
  },
  noTabBar: {
    paddingBottom: 0
  }
})
