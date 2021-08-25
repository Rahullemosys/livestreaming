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
    VideoRemoteState
} from 'react-native-agora';

import { useNavigation } from '@react-navigation/native';
import styles from './Style';
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

    const channelName = "live";

    const [camera, setCamera] = useState("Back camera")

    const token = '0069d0fe06a31134cddb367f594fea6ff8dIAAuDO4HeEU1vJcS3gUNGHNx9H9T0CG15gqukAA+kglThK8sD1MAAAAAEAB1cLwPcMkgYQEAAQBwySBh';

    const [broadcasterVideoState, setBroadcasterVideoState] = useState(
        VideoRemoteState.Decoding,
    );

    const navigation = useNavigation();

    const AgoraEngine = useRef();

    useEffect(() => {

        if (Platform.OS === 'android') requestCameraAndAudioPermission();

        startCall()

        init()

        console.log('i fire once');

    }, [init])

    const init = async () => {

        AgoraEngine.current = await RtcEngine.create(
            '9d0fe06a31134cddb367f594fea6ff8d',
        );
        AgoraEngine.current.enableVideo();

        AgoraEngine.current.addListener('Warning', (warn) => {
            console.log('Warning', warn);
        });

        AgoraEngine.current.addListener('Error', (err) => {
            console.log('Error', err);
        });

        AgoraEngine.current.addListener('RemoteVideoStateChanged', (uid, state) => {
            if (uid === 1) setBroadcasterVideoState(state);
            console.log(uid, state)
        });

        AgoraEngine.current.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed);

            if (peerIds.indexOf(uid) === -1) {
                setPeerIds([...peerIds, uid],);
                console.log(peerIds)
            }
        });

        AgoraEngine.current.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);
            setPeerIds(
                peerIds.filter((id) => id !== uid),
            )
        });

        AgoraEngine.current.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed);
            setJoinSucceed(true)
        });
    }

    const startCall = async () => {
        await AgoraEngine.current?.joinChannel(
            token,
            channelName,
            null,
            0
        );
    };

    const endCall = async () => {
        await AgoraEngine.current?.leaveChannel(
            console.log("call End")
        );
        setPeerIds([])
        setJoinSucceed(false)
        navigation.navigate('Home')
    };

    const onSwitchCamera = () => {
        AgoraEngine.current.switchCamera(
            camera === "Back camera" ? setCamera("Front camera") : setCamera("Back camera")
        )
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
                horizontal={true} >

                {peerIds.map((value, index) => {
                    return (
                        <RtcRemoteView.SurfaceView
                            key={index}
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
        <View style={styles.max}>
            <View style={styles.max}>
                {broadcasterVideoState === VideoRemoteState.Decoding ? renderVideos() :
                    <View style={styles.broadcasterVideoStateMessage}>
                        <Text style={styles.broadcasterVideoStateMessageText}>
                            {videoStateMessage(broadcasterVideoState)}
                        </Text>
                    </View>}
                <View style={styles.buttonHolder}>
                    <TouchableOpacity onPress={endCall} style={styles.button}>
                        <Text style={styles.buttonText}> End Call </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onSwitchCamera} style={styles.button}>
                        <Text style={styles.buttonText}> {camera} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
