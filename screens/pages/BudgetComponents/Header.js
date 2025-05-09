import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import logo from "../../../assets/l.png";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View className="flex-row items-center py-[10px] pb-[12px] border-b border-gray-200 justify-between px-[10px]">
        <View className="flex-row items-center ml-[10px] space-x-2">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={24} color="black" />
          </TouchableOpacity>
          <Image source={logo} className="w-[90px] h-[25px]" />
        </View>
        <TouchableOpacity className="mr-[10px] border border-gray-300 rounded-[5px] p-1">
          <Icon name="settings" size={20} color="#656565" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;
