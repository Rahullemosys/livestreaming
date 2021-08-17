import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function WatchStream() {

  const navigation = useNavigation();

  const [joinChannel, setJoinChannel] = useState('');

  const joinLive = () =>
    navigation.navigate('Live', { type: 'join', channel: joinChannel });

  return (
    <View style={styles.container}>
      <View style={styles.joinContainer}>
        <Text style={styles.title}>Join Live Stream</Text>
        <TextInput
          value={joinChannel}
          onChangeText={setJoinChannel}
          placeholder="Enter Livestream Id"
          style={styles.joinChannelInput}
        />
        <TouchableOpacity
          onPress={joinLive}
          disabled={joinChannel === ''}
          style={[
            styles.button,
            { backgroundColor: joinChannel === '' ? '#555555' : '#78b0ff' },
          ]}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
    color: '#333',
  },
  joinContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingTop: 50,
    borderTopWidth: 1,
    borderColor: '#22222255',
  },
  joinChannelInput: {
    marginBottom: 20,
    backgroundColor: '#cccccc77',
    width: '80%',
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 17,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#78b0ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});