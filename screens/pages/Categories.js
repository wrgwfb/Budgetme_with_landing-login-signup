import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import logo from "../../assets/lgoooo.png";
import mockData from "../../assets/data/mockData.json";
import AddCategoryModal from "../ModalComponent/AddCategoryModal";
import { StatusBar } from "expo-status-bar";

// Import all icons from categoryIconSets.json
import IncomePaycheckIcon from "../../assets/categoryIcons/IncomePaycheck.png";
import IncomeBonusIcon from "../../assets/categoryIcons/IncomeBonus.png";
import IncomeGiftIcon from "../../assets/categoryIcons/IncomeGift.png";
import IncomeInvestmentIcon from "../../assets/categoryIcons/IncomeInvestment.png";
import IncomeFreelanceIcon from "../../assets/categoryIcons/IncomeFreelance.png";
import ExpenseUtilitiesIcon from "../../assets/categoryIcons/ExpenseUtilities.png";
import ExpenseGroceriesIcon from "../../assets/categoryIcons/ExpenseGroceries.png";
import ExpenseRentIcon from "../../assets/categoryIcons/ExpenseRent.png";
import ExpenseEntertainmentIcon from "../../assets/categoryIcons/ExpenseEntertainment.png";
import ExpenseTravelIcon from "../../assets/categoryIcons/ExpenseTravel.png";

const { width, height } = Dimensions.get("window");

// Map icon keys to imported assets
const iconMap = {
  IncomePaycheckIcon,
  IncomeBonusIcon,
  IncomeGiftIcon,
  IncomeInvestmentIcon,
  IncomeFreelanceIcon,
  ExpenseUtilitiesIcon,
  ExpenseGroceriesIcon,
  ExpenseRentIcon,
  ExpenseEntertainmentIcon,
  ExpenseTravelIcon,
};

// Helper function to format currency in PHP
const formatCurrency = (value) => {
  return `PHP ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const Categories = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(null); // Track which category's menu is visible
  const [isModalVisible, setIsModalVisible] = useState(false); // Track modal visibility

  // State to manage categories dynamically
  const [incomeCategories, setIncomeCategories] = useState(
    mockData.walletScreen.incomeCategories
  );
  const [expenseCategories, setExpenseCategories] = useState(
    mockData.walletScreen.expenseCategories
  );

  const toggleMenu = (id) => {
    setMenuVisible(menuVisible === id ? null : id);
  };

  const handleOptionPress = (option, categoryId) => {
    console.log(`Selected ${option} for category ${categoryId}`);
    setMenuVisible(null); // Close menu after selection
    // Implement actual logic for edit, delete here
  };

  const handleAddCategory = (type, newCategory) => {
    if (type === "Income") {
      setIncomeCategories([...incomeCategories, newCategory]);
    } else {
      setExpenseCategories([...expenseCategories, newCategory]);
    }
  };

  // Use mock data from JSON
  const { accountBalance, totalExpenses, totalIncome } = mockData.walletScreen;

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="light" />
      {/* Full-screen SVG Gradient Background */}
      <Svg height={height} width={width} style={{ position: "absolute" }}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="60%" y2="100%">
            <Stop offset="10%" stopColor="#003087" stopOpacity="1" />
            <Stop offset="30%" stopColor="#00295f" stopOpacity="1" />
            <Stop offset="60%" stopColor="#021b3d" stopOpacity="1" />
            <Stop offset="100%" stopColor="#021530" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill="url(#grad)" />
      </Svg>

      {/* Scrollable Content */}
      <ScrollView className="flex-1">
        <View className="bg-transparent mb-[60px]">
          {/* Header */}
          <View className="flex-row items-center justify-between mx-5 py-3">
            <View className="flex-row items-center shadow-md space-x-3">
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="menu" size={24} color="white" />
              </TouchableOpacity>
              <Image source={logo} className="w-[78px] h-[16px]" />
            </View>
            <TouchableOpacity className="items-center justify-center w-8 h-8 bg-white rounded-md shadow-md">
              <Icon name="bell" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View className="items-center mt-6">
            <View className="items-center justify-center space-y-[-1px]">
              <Text className="text-gray-400 font-poppins text-sm">
                Account Balance
              </Text>
              <Text className="text-white font-poppins text-3xl font-bold">
                {accountBalance}
              </Text>
            </View>
            {/* Centered Expenses and Income */}
            <View className="flex-row items-center justify-center mt-4 space-x-5">
              <View className="flex-row items-center">
                <View className="flex-row items-center justify-center bg-red-900 rounded-lg p-3 shadow-md">
                  <Icon name="arrow-down-right" size={24} color="#dddddd" />
                </View>
                <View className="ml-2 space-y-[-5px] mt-0.5">
                  <Text className="text-gray-400 font-poppins text-xs">
                    Total Expenses
                  </Text>
                  <Text className="text-white font-poppins text-base font-medium">
                    {totalExpenses}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <View className="flex-row items-center justify-center bg-green-600 rounded-lg p-3 shadow-md">
                  <Icon name="arrow-up-right" size={24} color="#dddddd" />
                </View>
                <View className="ml-2 space-y-[-5px] mt-0.5">
                  <Text className="text-gray-400 font-poppins text-xs">
                    Total Income
                  </Text>
                  <Text className="text-white font-poppins text-base font-medium">
                    {totalIncome}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* White Container for Categories */}
          <View className="w-full bg-white shadow-lg pt-4 mt-6">
            {/* Income Categories */}
            <Text className="text-[16px] font-poppins font-bold text-gray-800 mb-3 mx-5">
              Income Categories
            </Text>
            {incomeCategories.map((category) => (
              <View key={category.id} className="mb-3 mx-5">
                <View className="flex-row items-center bg-white border border-gray-100 rounded-lg p-1 shadow-sm relative">
                  <View
                    className={`rounded-full p-2 mr-3 ${
                      category.type === "Income"
                        ? "bg-purple-600/10 border border-purple-600"
                        : "bg-blue-600/10 border border-blue-600"
                    }`}
                  >
                    <Image
                      source={iconMap[category.icon]}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                  </View>
                  <View className="flex-1 space-y-[-5px]">
                    <Text className="text-base font-poppins font-semibold text-[#000000]">
                      {category.title}
                    </Text>
                    <View className="flex-row items-center space-x-2 ">
                      <View
                        className={`${
                          category.type === "Income"
                            ? "bg-purple-600 p-1 rounded-full"
                            : "text-blue-600 p-1 rounded-full"
                        }`}
                      />
                      <Text
                        className={`text-sm font-poppins ${
                          category.type === "Income"
                            ? "text-purple-600"
                            : "text-blue-600"
                        }`}
                      >
                        {category.type} Category
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleMenu(category.id)}
                    className="absolute right-4"
                  >
                    <Icon name="more-vertical" size={20} color="#000000" />
                  </TouchableOpacity>
                </View>
                {menuVisible === category.id && (
                  <View className="absolute right-4 top-12 bg-white rounded-lg shadow-md p-2 border border-gray-200 z-10">
                    <TouchableOpacity
                      className="py-2 px-4"
                      onPress={() => handleOptionPress("Edit", category.id)}
                    >
                      <Text className="text-sm font-poppins text-gray-700">
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="py-2 px-4"
                      onPress={() => handleOptionPress("Delete", category.id)}
                    >
                      <Text className="text-sm font-poppins text-gray-700">
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}

            {/* Add New Category Button (Income) */}
            <TouchableOpacity
              className="bg-[#FFFFFF] rounded-lg p-3 shadow-md flex-row items-center justify-center mx-[20%] mb-4"
              style={{
                borderStyle: "dashed",
                borderWidth: 2,
                borderColor: "#d1d5db",
              }}
              onPress={() => setIsModalVisible(true)}
            >
              <Icon name="plus" size={24} color="#424242" />
              <Text className="text-[#424242] font-poppins font-semibold text-base ml-2">
                ADD NEW CATEGORY
              </Text>
            </TouchableOpacity>

            {/* Expense Categories */}
            <Text className="text-[16px] font-poppins font-bold text-gray-800 mb-3 mt-4 mx-5">
              Expense Categories
            </Text>
            {expenseCategories.map((category) => (
              <View key={category.id} className="mb-3 mx-5">
                <View className="flex-row items-center bg-white border border-gray-100 rounded-lg p-1 shadow-sm relative">
                  <View
                    className={`rounded-full p-2 mr-3 ${
                      category.type === "Income"
                        ? "bg-purple-600/10 border border-purple-600"
                        : "bg-blue-600/10 border border-blue-600"
                    }`}
                  >
                    <Image
                      source={iconMap[category.icon]}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-poppins font-semibold text-gray-800">
                      {category.title}
                    </Text>
                    <View className="flex-row items-center space-x-2 ">
                      <View
                        className={`${
                          category.type === "Income"
                            ? "bg-purple-600 p-1 rounded-full"
                            : "bg-blue-600 p-1 rounded-full"
                        }`}
                      />
                      <Text
                        className={`text-sm font-poppins ${
                          category.type === "Income"
                            ? "text-purple-600"
                            : "text-blue-600"
                        }`}
                      >
                        {category.type} Category
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleMenu(category.id)}
                    className="absolute right-4"
                  >
                    <Icon name="more-vertical" size={20} color="#000000" />
                  </TouchableOpacity>
                </View>
                {menuVisible === category.id && (
                  <View className="absolute right-4 top-12 bg-white rounded-lg shadow-md p-2 border border-gray-200 z-10">
                    <TouchableOpacity
                      className="py-2 px-4"
                      onPress={() => handleOptionPress("Edit", category.id)}
                    >
                      <Text className="text-sm font-poppins text-gray-700">
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="py-2 px-4"
                      onPress={() => handleOptionPress("Delete", category.id)}
                    >
                      <Text className="text-sm font-poppins text-gray-700">
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}

            {/* Add New Category Button (Expense) */}
            <TouchableOpacity
              className="bg-[#FFFFFF] rounded-lg p-3 shadow-md flex-row items-center justify-center mx-[20%] mb-8"
              style={{
                borderStyle: "dashed",
                borderWidth: 2,
                borderColor: "#d1d5db",
              }}
              onPress={() => setIsModalVisible(true)}
            >
              <Icon name="plus" size={24} color="#424242" />
              <Text className="text-[#424242] font-poppins font-semibold text-base ml-2">
                ADD NEW CATEGORY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Add Category Modal */}
      <AddCategoryModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        isPremium={false} // Adjust based on your user’s premium status
        onAddCategory={handleAddCategory}
      />
    </SafeAreaView>
  );
};

export default Categories;
