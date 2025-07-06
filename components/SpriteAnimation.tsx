import React, { useEffect, useRef } from "react";
import { Animated, ImageSourcePropType, View } from "react-native";

type SpriteAnimatorProps = {
  source: ImageSourcePropType;
  frameWidth: number;
  frameHeight?: number;
  frameCount: number;
  scale?: number;
  frameDuration?: number; // in ms
};

export default function SpriteAnimator({
  source,
  frameWidth,
  frameHeight,
  frameCount,
  scale = 1,
  frameDuration = 100,
}: SpriteAnimatorProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const displayWidth = frameWidth * scale;
  const displayHeight = (frameHeight || frameWidth) * scale;

  useEffect(() => {
    let frame = 0;

    const interval = setInterval(() => {
      translateX.setValue(-frameWidth * scale * frame);
      frame = (frame + 1) % frameCount;
    }, frameDuration);

    return () => clearInterval(interval);
  }, [frameWidth, scale, frameCount, frameDuration, translateX]);

  return (
    <View
      style={{ width: displayWidth, height: displayHeight, overflow: "hidden" }}
    >
      <Animated.Image
        source={source}
        style={{
          width: displayWidth * frameCount,
          height: displayHeight,
          transform: [{ translateX }],
        }}
        resizeMode="cover"
      />
    </View>
  );
}
