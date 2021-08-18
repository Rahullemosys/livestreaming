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

    const [channelName, setChannelName] = useState('videochat')

    const [camera, setCamera] = useState("Back camera")

    const token = '006a10f9ec87bf6425795fa4c302eb5dc35IAA356G5gjBxhh/LnlzJXIbS660CrazbVrb8Trb+IrvE251fCyoAAAAAEAC1iXookUseYQEAAQCQSx5h/BoeYQEAAQD7Gh5h';

    const navigation = useNavigation();

    const AgoraEngine = useRef();

    useEffect(() => {
        if (Platform.OS === 'android') requestCameraAndAudioPermission();

        init();

        startCall();

    }, [52])


    const init = async () => {

        AgoraEngine.current = await RtcEngine.create(
            'a10f9ec87bf6425795fa4c302eb5dc35',
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
        // Join Channel using null token and channel name
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

    const onSwitchCamera = () => { AgoraEngine.current.switchCamera(camera === "Back camera" ? setCamera("Front camera") : setCamera("Back camera")) }



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
                {peerIds.map((value,) => {
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
        <View style={styles.max}>
            <View style={styles.max}>
                {renderVideos()}
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
