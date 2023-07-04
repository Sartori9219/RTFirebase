import React from "react";
import { useState } from 'react';
import { StyleSheet, Text, Image, Pressable, View } from "react-native";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
const seedLightImage = "assets/seed_white.svg";
const seedHoverImage = "assets/seed_mouseover.png";

function Seed(props) {
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      <Pressable
        onHoverIn={() => setIsHover(true)}
        onHoverOut={() => setIsHover(false)}
      >
        <OverlayTrigger
          delay={{ hide: 200, show: 300 }}
          overlay={(props) => (
            <Tooltip id="custom-tooltip" {...props}>
              <Text style={{ color: '#fff' }}>
                {` Get more seeds by demonstrating mastery on a subject. Spend your seeds on hints.  Loot and rewards are coming soon.`}
              </Text>
            </Tooltip>
          )}
          placement="bottom"
        >
          <View style={{ flexDirection: 'row', width: 50 }}>
            <Text style={[styles.seedText, { flex: 0.3, justifyContent: 'flex-end' }]}>
              {props.user.seed}
            </Text>
            <View style={{ flex: 0.7, justifyContent: 'flex-end' }}>
              {
                isHover ? (
                  <Image source={seedHoverImage} style={styles.seedHoverIcon} />
                ) : (
                  <Image source={seedLightImage} style={styles.seedIcon} />
                )
              }
            </View>
          </View>

        </OverlayTrigger>
      </Pressable>
    </>
  );
}

export default Seed;

const styles = StyleSheet.create({
  seedText: {
    color: "#fff",
    fontSize: "120%",
    fontWeight: "400",
  },
  seedIcon: {
    width: 16,
    height: 16,
    marginLeft: 4,
  },
  seedHoverIcon: {
    width: 26,
    height: 26,
    marginLeft: 4,
  },
});
