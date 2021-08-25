import React, {
    useState
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};


export function ButtonContainer(props) {

    return (

        <View style={styles.buttonContainer}>

            {props.isBroadcaster ?
                <>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={props.onSwitchCamera}>
                            <FontAwesome5 name={'camera'} Solid size={30} color={props.Color} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={props.onMute}>
                            <FontAwesome5 name={'microphone-alt-slash'} solid size={30} color={props.Color} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={props.onCamera}>
                            <FontAwesome5 name={'video'} solid size={30} color={props.Color} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={props.onEndStream}>
                            <FontAwesome5 name={'sign-out-alt'} solid size={30} color={props.Color} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={props.onShare}>
                            <FontAwesome5 name={'share-alt-square'} solid size={30} color={props.Color} />
                        </TouchableOpacity>
                    </View>

                </>
                :
                <>
                    <TouchableOpacity style={styles.button} onPress={props.onLeave}>
                        <FontAwesome5 name={'sign-out-alt'} solid size={30} />
                    </TouchableOpacity>
                </>
            }

        </View>

    )
}


const styles = StyleSheet.create({

    buttonContainer: {
        position: 'absolute',
        top: 10,
        right: 20
    },
    button: {
        width: 50,
        paddingVertical: 13,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 17,
    },
    endStream: {
        position: 'absolute',
        left: 20,
        top: 15,
    }
});