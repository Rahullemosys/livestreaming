import React from 'react'

import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

export function CommentSection(props) {

    return (
        <View style={styles.commentView}>

            <View style={styles.commentIB}>

                <TextInput placeholder="comment" style={styles.commentInput} />

                <TouchableOpacity style={styles.commentButton} onPress={props.onSubmit}>

                    <FontAwesome5 name={'arrow-circle-right'} solid size={50} />

                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    commentView: {
        width: dimensions.width,
        position: 'absolute',
        bottom: 10
    },
    commentIB: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentInput: {
        width: '70%',
        borderWidth: 2,
        marginLeft: 10,
        borderRadius: 20,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20
    },
    commentButton: {
        width: '20%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});