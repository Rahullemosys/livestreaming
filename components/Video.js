import React, {
    useEffect,
    useRef,
    useState
} from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';

import RtcEngine, {
    ChannelProfile,
    ClientRole,
    RtcLocalView,
    RtcRemoteView,
    VideoRenderMode,
} from 'react-native-agora';

import { useNavigation } from '@react-navigation/native';

import requestCameraAndAudioPermission from './Permission';

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

const videoStateMessage = (state) => {
    switch (state) {
        case VideoRemoteState.Stopped:
            return 'Video turned off by Host';

        case VideoRemoteState.Frozen:
            return 'Connection Issue, Please Wait';

        case VideoRemoteState.Failed:
            return 'Network Error';
    }
};

export const Video = (props) => {

    const [joinSucceed, setJoinSucceed] = useState(false)

    const [peerIds, setPeerIds] = useState([])

    const [channelName, setChannelName] = useState('videochat')

    const navigation = useNavigation();

    const AgoraEngine = useRef();

    useEffect(() => {
        if (Platform.OS === 'android') requestCameraAndAudioPermission();

        init();

    }, [])


    const init = async () => {

        AgoraEngine.current = await RtcEngine.create(
            'ad07b133744c43049fa339692513e594',
        );
        AgoraEngine.current.enableVideo();

        AgoraEngine.current.addListener('Warning', (warn) => {
            console.log('Warning', warn);
        });

        AgoraEngine.current.addListener('Error', (err) => {
            console.log('Error', err);
        });

        AgoraEngine.current.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed);
        });

        AgoraEngine.current.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);
        });

        AgoraEngine.current.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed);
        });
    }

    const renderVideos = () => {

        return joinSucceed ? (
            <View style={styles.fullView}>
                <RtcLocalView.SurfaceView
                    style={styles.max}
                    channelId={channelName}
                    renderMode={VideoRenderMode.Hidden}
                />
                {renderRemoteVideos()}
            </View>
        ) : null;
    };

    const renderRemoteVideos = () => {

        return (
            <ScrollView
                style={styles.remoteContainer}
                contentContainerStyle={{ paddingHorizontal: 2.5 }}
                horizontal={true}
            >
                {peerIds.map((value) => {
                    return (
                        <RtcRemoteView.SurfaceView
                            style={styles.remote}
                            uid={value}
                            channelId={channelName}
                            renderMode={VideoRenderMode.Hidden}
                            zOrderMediaOverlay={true}
                        />
                    );
                })}
            </ScrollView>
        );
    };



    return (
        <Text>Video call</Text>
    )
}