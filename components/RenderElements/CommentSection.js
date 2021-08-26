import React, { useState, useEffect } from 'react'

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
import { submitComment } from "../ApiService";

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

export function CommentSection(props) {
    const Name = props.name;
    const Host = "Host"
    const [Id, setId] = useState()
    const [comment, setComment] = useState("")
    const [printComment, setPrintComment] = useState("")


    if (props.name === "") {
        Name = Host
    }

    const onSubmit = () => {
        submitComment(Name, comment, Id)
            .then((result) => {
                console.log(result)
                setPrintComment(comment)
                setComment("")
            })
            .catch((error) => {
                console.log(error, "error");
            })
    }

    return (
        <View style={styles.commentView}>

            <View style={styles.TextBorder}>

                <ScrollView>
                    <View style={styles.TextRender}>
                        <Text key={Id} style={styles.HeaderText}> {Name ? Name : Host} : </Text>
                        <Text style={styles.CommentText}>{printComment}</Text>
                    </View>
                </ScrollView>

            </View>


            <View style={styles.commentIB}>

                <TextInput
                    placeholder="comment"
                    placeholderTextColor="black"
                    style={styles.commentInput}
                    value={comment}
                    onChangeText={(text) => { setComment(text) }}
                />

                <TouchableOpacity style={styles.commentButton} onPress={onSubmit}>
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
        height: 250,
        padding: 15,
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
        width: '75%',
        fontSize: 20,
        color: '#fff',
    }
});