import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';

const WIDTH = 20;
const HEIGHT = 16;
const THUMB_SIZE = 5;
const PADDING = 5;

export default function RingSwitch({ value, onChange }) {
  const translateX = useRef(
    new Animated.Value(value ? WIDTH - THUMB_SIZE - PADDING * 2.5 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? WIDTH - THUMB_SIZE - PADDING * 2.5 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={[
        styles.track
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          { transform: [{ translateX }] },
        ]}
      >
        <View style={styles.outerRing}>
          <View
            style={[
              styles.innerDot,
              value ? { backgroundColor: '#fff' } : null
            ]}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    padding: PADDING,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff'
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    width: 10,
    height: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
