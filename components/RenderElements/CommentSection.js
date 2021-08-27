import React, { useState, useEffect, useRef } from 'react'

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
import { submitComment, commentRender } from "../ApiService";
import { database } from "../../Setup";

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

export function CommentSection(props) {
    const Name = props.name;
    const HostName = props.hostName;
    const Host = "Host"
    const [Id, setId] = useState()
    const [comment, setComment] = useState("")
    const [user, setUser] = useState([])

    const [hostName, setHostName] = useState(HostName)

    useEffect(() => {
        console.log(HostName)
        setHostName(HostName)
        const userRef = database().ref('/user');
        const Listner = userRef.on('value', snapshot => {

            setUser([])
            snapshot.forEach(childSnapshot => {
                setUser(user => [...user, childSnapshot.val()]);
            })
        })

        return () => {
            userRef.off('value', Listner)
        }

    }, [Name])

    const onSubmit = () => {
        submitComment(Name, comment, Id, hostName)
            .then((result) => {
                console.log(result)
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

                    {user.map((item, index) => {
                        return (
                            <View style={styles.TextRender} key={index}>
                                <Text style={styles.HeaderText}> {item.Name}: </Text>
                                <Text style={styles.CommentText}>{item.comment}</Text>
                            </View>
                        )
                    })}

                </ScrollView>

            </View>

            <View style={styles.commentIB}>

                <TextInput
                    placeholder="comment"
                    placeholderTextColor="black"
                    style={styles.commentInput}
                    value={comment}
                    onChangeText={(text) => {setComment(text)}}
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



// {username === " " ? Host : username}