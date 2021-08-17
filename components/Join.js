import React, {
    useEffect,
    useRef,
    useState
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    Share,
    TouchableOpacity,
} from 'react-native';

import RtcEngine, {
    ChannelProfile,
    ClientRole,
    RtcLocalView,
    RtcRemoteView,
    VideoRemoteState,
} from 'react-native-agora';

import requestCameraAndAudioPermission from './Permission';

import { useNavigation } from '@react-navigation/native';

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

// const channel = e083c396-0c32-4076-8732-3d023f800da6;

export const Join = (props) => {

    const navigation = useNavigation();

    const [joined, setJoined] = useState(false);
    const isBroadcaster = props.route.params.type === 'create';
    const AgoraEngine = useRef();
    const [broadcasterVideoState, setBroadcasterVideoState] = useState(
        VideoRemoteState.Decoding,
    );
    const init = async () => {
        AgoraEngine.current = await RtcEngine.create(
            'ad07b133744c43049fa339692513e594',
        );
        AgoraEngine.current.enableVideo();
        AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
        if (isBroadcaster)

        AgoraEngine.current.setClientRole(ChannelProfile.LiveBroadcasting);

        AgoraEngine.current.addListener('RemoteVideoStateChanged', (uid, state) => {
            if (uid === 1) setBroadcasterVideoState(state);
        });

        AgoraEngine.current.addListener(
            'JoinChannelSuccess',
            (channel, uid, elapsed) => {
                console.log('JoinChannelSuccess', channel, uid, elapsed);
                setJoined(true);
            },
        );
    };

    useEffect(() => {
        if (Platform.OS === 'android') requestCameraAndAudioPermission();
        const uid = isBroadcaster ? 1 : 0;
        init().then(() =>
            AgoraEngine.current.joinChannel(
                null,
                props.route.params.channel,
                null,
                uid,
            ),
        );
        return () => {
            AgoraEngine.current.destroy();
        };
    }, []);

    const renderHost = () =>
        broadcasterVideoState === VideoRemoteState.Decoding ? (
            <RtcRemoteView.SurfaceView
                uid={1}
                style={styles.fullscreen}
                channelId={props.route.params.channel}
            />
        ) : (
            <View style={styles.broadcasterVideoStateMessage}>
                <Text style={styles.broadcasterVideoStateMessageText}>
                    {videoStateMessage(broadcasterVideoState)}
                </Text>
            </View>
        );

    const renderLocal = () => (
        <RtcLocalView.SurfaceView
            style={styles.fullscreen}
            channelId={props.route.params.channel}
        />
    );

    const onLeave = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>

            {!joined ? <>
                <ActivityIndicator
                    size={60}
                    color="#222"
                    style={styles.activityIndicator}
                />
                <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
            </> :
                <>
                    {isBroadcaster ? renderHost() : renderLocal()}
                    <View style={styles.buttonContainer}>

                        {isBroadcaster ?
                            <>
                                <TouchableOpacity style={styles.button} onPress={onSwitchCamera}>
                                    <Text style={styles.buttonText}>Flip</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} onPress={onEndStream}>
                                    <Text style={styles.buttonText}>End stream</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} onPress={onShare}>
                                    <Text style={styles.buttonText}>Share</Text>
                                </TouchableOpacity>
                            </>
                            :
                            <>
                                <TouchableOpacity style={styles.button} onPress={onLeave}>
                                    <Text style={styles.buttonText}>Leave</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </View>
                </>
            }

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#222',
    },
    fullscreen: {
        width: dimensions.width,
        height: dimensions.height,
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
    },
    button: {
        width: 150,
        backgroundColor: '#fff',
        marginBottom: 50,
        paddingVertical: 13,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 17,
    },
    broadcasterVideoStateMessage: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    broadcasterVideoStateMessageText: {
        color: '#fff',
        fontSize: 20,
    },
});