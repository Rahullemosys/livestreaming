import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';

export function ActivityIndicate() {
    return (
        <View>
            <ActivityIndicator
                size={60}
                color="#222"
            />
            <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingText: {
        fontSize: 18,
        color: '#222',
    },
});