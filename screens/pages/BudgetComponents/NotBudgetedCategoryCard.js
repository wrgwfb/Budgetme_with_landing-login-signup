import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

const NotBudgetedCategoryCard = ({
  item,
  iconMap,
  mockUser = { userStatus: "Free" },
}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleCategoryPress = () => {
    if (item.isPremium && mockUser.userStatus !== "Premium") {
      Alert.alert(
        "Premium Required",
        "This category is available only for premium users."
      );
      return;
    }
    setMenuVisible(true);
  };

  const handleSetBudget = () => {
    console.log(`Navigating to set budget for ${item.name}`);
    setMenuVisible(false);
    navigation.navigate("AddExpense", {
      category: {
        id: item.id,
        title: item.name,
        icon: item.key,
        type: item.type,
      },
    });
  };

  const handleEditDetails = () => {
    console.log(`Editing details for ${item.name}`);
    setMenuVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        className="flex-row items-start bg-white border border-gray-200 rounded-lg p-3 shadow-sm mb-3"
        onPress={handleCategoryPress}
        disabled={item.isPremium && mockUser.userStatus !== "Premium"}
      >
        <View
          className={`rounded-[5px] p-2 mr-3 bg-gray-50 shadow-sm border border-gray-100 ${
            item.isPremium && mockUser.userStatus !== "Premium"
              ? "opacity-50"
              : ""
          }`}
        >
          <Image
            source={iconMap[item.key]}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </View>
        <View className="flex-1">
          <Text
            className={`text-[16px] font-poppins-semibold font-semibold ${
              item.isPremium && mockUser.userStatus !== "Premium"
                ? "text-gray-400"
                : "text-gray-800"
            }`}
          >
            {item.name}{" "}
            {item.isPremium && mockUser.userStatus !== "Premium"
              ? "(Premium)"
              : ""}
          </Text>
          <View className="flex-row items-center space-x-1">
            <View
              className={`w-2 h-2 ${
                item.isPremium ? "bg-gray-400" : "bg-[#301788]"
              } rounded-full`}
            />
            <Text
              className={`text-[14px] font-poppins ${
                item.isPremium && mockUser.userStatus !== "Premium"
                  ? "text-gray-400"
                  : "text-[#301788]"
              }`}
            >
              {item.type} Category
            </Text>
          </View>
        </View>
        {!(item.isPremium && mockUser.userStatus !== "Premium") && (
          <TouchableOpacity
            onPress={() => setMenuVisible(!isMenuVisible)}
            className="absolute right-4 top-4"
          >
            <Icon name="more-vertical" size={20} color="#000000" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {isMenuVisible && (
        <View className="absolute right-4 top-12 bg-white rounded-lg shadow-md p-2 border border-gray-200 z-10">
          <TouchableOpacity className="py-2 px-4" onPress={handleSetBudget}>
            <Text className="text-sm font-poppins text-gray-700">
              Set a budget
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2 px-4" onPress={handleEditDetails}>
            <Text className="text-sm font-poppins text-gray-700">
              Edit Details
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default NotBudgetedCategoryCard;
