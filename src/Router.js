import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Login, MapScreen, CreateBubble, BubbleDetail } from './components';
import firebase from 'firebase';

const RouterComp = () => {
        return (
            <Router titleStyle={{color:'red'}}>
                <Scene key='root' hideNavBar>
                    <Scene key='login'
                        title='Login'
                        component={Login}/>

                    <Scene key='main'>
                        <Scene key='mapScreen'
                            title='Map'
                            component={MapScreen}
                            rightTitle='New'
                            leftTitle='Logout'
                            onLeft={() => {
                                firebase.auth().signOut()
                                Actions.login();
                            }}
                            onRight={() => Actions.createBubble()} />

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