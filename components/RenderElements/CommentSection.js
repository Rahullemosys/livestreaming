import React from 'react'

import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Text,
    ScrollView
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

export function CommentSection(props) {

    return (
        <View style={styles.commentView}>


            <View style={styles.TextBorder}>

                <ScrollView>
                    <View style={styles.TextRender}>
                        <Text style={styles.HeaderText}> Rahul : </Text>
                        <Text style={styles.CommentText}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. </Text>
                    </View>
                </ScrollView>

            </View>


            <View style={styles.commentIB}>

                <TextInput placeholder="comment" placeholderTextColor="black" style={styles.commentInput} />

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
        marginLeft: 10,
        borderWidth: 2,
        borderRadius: 20,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20,
        color: 'white'
    },
    commentButton: {
        width: '20%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextBorder: {
        width: '100%',
        height: 300,
        padding: 20,
    },
    TextRender: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
    },
    HeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    CommentText: {
        width:'75%',
        fontSize: 20,
        color: '#fff',
    }
});