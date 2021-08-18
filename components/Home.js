import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

export function Home() {
  const navigation = useNavigation();


  const createLive = () => {
    navigation.navigate('Live', { type: 'create', channel: uuid() });
  }

  const onAdd = () =>
    navigation.navigate('AddStream');

  const onJoin = () =>
    navigation.navigate('WatchStream');

const onVideo = () => {
  navigation.navigate('Video');
}

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Live Stream</Text>

      <View style={styles.createContainer}>

        <TouchableOpacity style={styles.button} onPress={createLive}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>

        <View style={styles.stream}>

          <TouchableOpacity onPress={onAdd} style={styles.borderStream}>
            <Text style={styles.buttonText}>Add Stream</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onJoin} style={styles.borderStream}>
            <Text style={styles.buttonText}>Join Stream</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.video}>

          <TouchableOpacity onPress={onVideo} style={styles.borderStream}>
            <Text style={styles.buttonText}>Video Call</Text>
          </TouchableOpacity>

        </View>

      </View>
    </View>
  );
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
    color: '#333',
  },
  createContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: '15%',
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555555',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  stream: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: "10%",
    height: '25%',
    width: '80%',
    backgroundColor: "#78b0ff",
  },
  video:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: "10%",
    height: '15%',
    width: '80%',
    backgroundColor: '#555555',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  borderStream: {
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});