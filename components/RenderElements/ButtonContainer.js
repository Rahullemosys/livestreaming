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

    const solids = props.solid


    return (
        <View style={styles.buttonContainer}>

            { props.isBroadcaster ?
                <>
                    <TouchableOpacity  style={styles.button} onPress={props.onSwitchCamera}>
                    <FontAwesome5 name={'camera'} solid size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.button} onPress={props.onEndStream}>
                    <FontAwesome5 name={'sign-out-alt'} solid size={30}/>
                    </TouchableOpacity>

                    <TouchableOpacity   style={styles.button} onPress={props.onShare}>
                        <FontAwesome5 name={'share-alt-square'} solid size={30} />
                    </TouchableOpacity>

                </>
                :
                <>
                    <TouchableOpacity style={styles.button} onPress={props.onLeave}>
                    <FontAwesome5 name={'sign-out-alt'} solid size={30}/>
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
        right:20
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
});