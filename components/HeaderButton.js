import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const CustomHeaderButton = (props) => {
  let darkMode = useSelector((state) => state.goals.darkMode);

  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={30}
      color="#e91e63"
    />
  );
};

export default CustomHeaderButton;
