import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Login, MapScreen, CreateBubble, BubbleDetail } from './components';

const RouterComp = () => {
    return (
        <Router titleStyle={{ color: 'red' }}>
            <Scene key='root' hideNavBar>
                <Scene key='login'
                    title='Login'
                    component={Login} />

                <Scene key='main' initial>
                    <Scene key='mapScreen'
                        component={MapScreen}
                        hideNavBar
                    />

                    <Scene key='createBubble'
                        title='CreateBubble'
                        component={CreateBubble} />

                    <Scene key='detailBubble'
                        title='BubbleDetail'
                        component={BubbleDetail} />

                </Scene>
            </Scene>
        </Router>
    )
}

export default RouterComp;