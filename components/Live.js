import React, {
    useEffect,
    useRef,
    useState
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Share,
} from 'react-native';

import RtcEngine, {
    ChannelProfile,
    ClientRole,
    RtcLocalView,
    RtcRemoteView,
    VideoRemoteState,
} from 'react-native-agora';

import { useNavigation } from '@react-navigation/native';

import { CommentSection, ButtonContainer, ActivityIndicate } from "./RenderElements";

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
        
        // case VideoRemoteState.Starting:
        //     return alert("Camera")
    }
};

export function Live(props) {

    const navigation = useNavigation();

    const isBroadcaster = props.route.params.type === 'create';

    const onShare = async () => {
        try {
            const result = await Share.share({ message: props.route.params.channel });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    console.log(result.activityType)
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const [joined, setJoined] = useState(false);

    const [noCamera, setNoCamera] = useState("off");

    const [mute, setMute] = useState(true);

    const [Color, setColor] = useState("black")

    const [name,setName]= useState("Host")

    const [broadcasterVideoState, setBroadcasterVideoState] = useState(
        VideoRemoteState.Decoding,
    );

    const AgoraEngine = useRef();

    const init = async () => {

        AgoraEngine.current = await RtcEngine.create(
            '640eb5dc1cd24cb8ab8443820ef7386e',
        );

        AgoraEngine.current.enableVideo();

        AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
        if (isBroadcaster)

            AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

        AgoraEngine.current.addListener('RemoteVideoStateChanged', (uid, state) => {
            if (uid === 1) setBroadcasterVideoState(state);
            console.log(uid, state ,"rahul")
        });

        AgoraEngine.current.addListener(
            'JoinChannelSuccess',
            (channel, uid, elapsed) => {
                console.log('JoinChannelSuccess', channel, uid, elapsed);
                setJoined(true);
                setName(props.route.params.username)
            },
        );

        AgoraEngine.current.addListener('Warning', (warn) => {
            console.log('Warning', warn);
        });

        AgoraEngine.current.addListener('Error', (err) => {
            console.log('Error', err);
        });

    };

    const onSwitchCamera = () => {
        console.log("Camera Switched")
        AgoraEngine.current.switchCamera(
            Color === "black" ? setColor("white")
                :
                setColor("black"));
    }

    const onMute = () => {
        console.log("Audio Mute Function called")
        mute === true ? AgoraEngine.current.disableAudio(setMute(false))
            :
            AgoraEngine.current.enableAudio(setMute(true))
    }

    const onCamera = () => {
        console.log("camera Enable Disable Function called")
        noCamera === "off" ? AgoraEngine.current.disableVideo(setNoCamera("turn on"),alert("Camera is Disable Now"))
            :
            AgoraEngine.current.enableVideo(setNoCamera("off"))
    }

    const onEndStream = () => {
        console.log("Stream End")
        AgoraEngine.current.leaveChannel()
        navigation.navigate('Home')
    }

    const onLeave = () => {
        AgoraEngine.current.destroy()
        navigation.navigate('Home')
    }

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

        // console.log(props.route.params.username)

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
        <>
            <RtcLocalView.SurfaceView
                style={styles.fullscreen}
                channelId={props.route.params.channel}
            />
        </>
    );

    return (
        <View style={styles.container}>
            {!joined ? (
                <ActivityIndicate />
            ) : (
                <>

                    {isBroadcaster ? renderLocal() : renderHost()}

                    <CommentSection name={name}/>

                    <ButtonContainer
                        isBroadcaster={isBroadcaster}
                        onSwitchCamera={onSwitchCamera}
                        onEndStream={onEndStream}
                        onShare={onShare}
                        onLeave={onLeave}
                        onCamera={onCamera}
                        onMute={onMute}
                        Color={Color}
                    />

                </>
            )}
        </View>
    );
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
        top: 10,
    },
    button: {
        width: 100,
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