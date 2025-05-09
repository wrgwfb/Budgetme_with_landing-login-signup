import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import moment from "moment";
import Icon from "react-native-vector-icons/Feather";
import categoryIconSets from "../../../assets/data/categoryIconSets.json";

const BudgetCategoryCard = ({ item, iconMap, formatCurrency, mockUser }) => {
  const isIconPremium = categoryIconSets.iconSets.Expense.find(
    (icon) => icon.key === item.icon
  )?.isPremium;

  const handleCategoryPress = () => {
    if (isIconPremium && !mockUser.isPremium) {
      Alert.alert(
        "Premium Required",
        "This category is available only for premium users."
      );
      return;
    }
    console.log(`Selected category: ${item.title}`);
  };

  return (
    <TouchableOpacity
      className="flex-row items-start bg-white border border-gray-100 rounded-lg p-3 shadow-sm mb-3"
      onPress={handleCategoryPress}
      disabled={isIconPremium && !mockUser.isPremium}
    >
      <View
        className={`rounded-[5px] p-2 mr-3 bg-gray-50 shadow-sm border border-gray-100 ${
          isIconPremium && !mockUser.isPremium ? "opacity-50" : ""
        }`}
      >
        <Image
          source={iconMap[item.icon]}
          className="w-6 h-6"
          resizeMode="contain"
        />
      </View>
      <View className="flex-1">
        <Text
          className={`text-[16px] font-poppins-semibold font-semibold ${
            isIconPremium && !mockUser.isPremium
              ? "text-gray-400"
              : "text-gray-800"
          }`}
        >
          {item.title} {isIconPremium && !mockUser.isPremium ? "(Premium)" : ""}
        </Text>
        <View className="flex-row items-center space-x-1">
          <View
            className={`w-2 h-2 rounded-full ${
              item.status === "active" ? "bg-green-600" : "bg-red-600"
            }`}
          />
          <Text
            className={`text-sm font-poppins ${
              item.status === "overdue"
                ? "text-red-600"
                : item.status === "active"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
        <Text className="text-[14px] text-gray-600">
          Budgeted:{" "}
          <Text className="font-poppins-semibold font-semibold text-green-500">
            {formatCurrency(item.amount)}
          </Text>
        </Text>
        <Text className="text-[14px] text-gray-600">
          Spent:{" "}
          <Text className="font-poppins-semibold font-semibold text-green-500">
            {formatCurrency(item.spent)}
          </Text>
        </Text>
        <Text className="text-[14px] text-gray-600">
          Remaining:{" "}
          <Text className="font-poppins-semibold font-semibold text-green-500">
            {formatCurrency(item.remaining)}
          </Text>
        </Text>
        <View className="flex-row items-center space-x-1 mt-[5px]">
          <Icon name="calendar" size={14} color="#5f5e5e" />
          <Text className="text-sm font-poppins text-gray-600">
            Due: {moment(item.dueDate).format("MMM D, YYYY")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BudgetCategoryCard;
