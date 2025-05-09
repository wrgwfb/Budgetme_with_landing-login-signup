import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Feather";
import mockData from "../../assets/data/mockData.json"; // Import the mock data

// Icon paths for wallets from iconSets.json
const walletIconPaths = {
  CreditCardVisaIcon: require("../../assets/walletIcons/CreditCardVisa.png"),
  CashWalletIcon: require("../../assets/walletIcons/CashWallet.png"),
  EWalletPayPalIcon: require("../../assets/walletIcons/EWalletPayPal.png"),
  SavingsBankIcon: require("../../assets/walletIcons/SavingsBank.png"),
};

// Icon paths for categories from categoryIconSets.json
const categoryIconPaths = {
  IncomePaycheckIcon: require("../../assets/categoryIcons/IncomePaycheck.png"),
  IncomeBonusIcon: require("../../assets/categoryIcons/IncomeBonus.png"),
  IncomeGiftIcon: require("../../assets/categoryIcons/IncomeGift.png"),
  IncomeInvestmentIcon: require("../../assets/categoryIcons/IncomeInvestment.png"),
  IncomeFreelanceIcon: require("../../assets/categoryIcons/IncomeFreelance.png"),
};

// Use wallet and category data from mockData.json
const walletsData = mockData.walletScreen.wallets;
const incomeCategoriesData = mockData.walletScreen.incomeCategories;

const AddIncome = () => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedWalletData, setSelectedWalletData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  // Auto-select the first wallet and category on component mount
  useEffect(() => {
    if (walletsData.length > 0) {
      const firstWallet = walletsData[0];
      setSelectedWallet(firstWallet.id);
      setSelectedWalletData(firstWallet);
      console.log("Auto-selected Wallet from mockData:", firstWallet);
    }
    if (incomeCategoriesData.length > 0) {
      const firstCategory = incomeCategoriesData[0];
      setSelectedCategory(firstCategory.id);
      setSelectedCategoryData(firstCategory);
      console.log("Auto-selected Category from mockData:", firstCategory);
    }
  }, []);

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet.id);
    setSelectedWalletData(wallet);
    console.log("Selected Wallet from mockData:", wallet);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    setSelectedCategoryData(category);
    console.log("Selected Category from mockData:", category);
  };

  const handleSave = () => {
    console.log("Income Data:", {
      wallet: selectedWalletData,
      category: selectedCategoryData,
      amount: amount,
      notes: notes,
    });
  };

  const renderWalletItem = ({ item }) => {
    const isSelected = selectedWallet === item.id;
    return (
      <TouchableOpacity
        className={`bg-[#ffffff] rounded-[10px] p-[10px] mr-[6px] w-[150px] ${
          isSelected
            ? "border-[#007AFF] border-[1px] shadow-md"
            : "border-[#E5E5E5] border-[1px]"
        }`}
        onPress={() => handleWalletSelect(item)}
      >
        <View className="flex-row items-center mb-[10px]">
          <Image
            source={walletIconPaths[item.icon]}
            className="w-[40px] h-[40px] mr-[6px]"
          />
          <Text className="font-poppins-medium text-[14px] text-[#000000]">
            {item.title}
          </Text>
        </View>
        <View className="flex-col items-start space-y-[-5px]">
          <Text className="font-poppins text-[12px] text-[#000000]">{item.type}</Text>
          <Text className="font-poppins text-[14px] text-[#26bb4b]">
            PHP {item.balance.toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryItem = ({ item }) => {
    const isSelected = selectedCategory === item.id;
    return (
      <TouchableOpacity
        className={`flex-row items-center bg-white border rounded-lg p-2 mr-[6px] w-[200px] ${
          isSelected
            ? "border-purple-600 border-[1px] shadow-md"
            : "border-gray-100 border-[1px]"
        }`}
        onPress={() => handleCategorySelect(item)}
      >
        <View
          className={`rounded-full p-1 mr-3 ${
            item.type === "Income"
              ? "bg-purple-600/10 border border-purple-600"
              : "bg-blue-600/10 border border-blue-600"
          }`}
        >
          <Image
            source={categoryIconPaths[item.icon]}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </View>
        <View className="flex-1 space-y-[-4px]">
          <Text className="text-base font-poppins font-semibold text-gray-800">
            {item.title}
          </Text>
          <View className="flex-row items-center space-x-2">
            <View
              className={`${
                item.type === "Income"
                  ? "bg-purple-600 p-1 rounded-full"
                  : "bg-blue-600 p-1 rounded-full"
              }`}
            />
            <Text
              className={`text-sm font-poppins ${
                item.type === "Income" ? "text-purple-600" : "text-blue-600"
              }`}
            >
              {item.type} Category
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" BarStyle="dark-content" />
      {/* Sticky Header */}
      <View className="z-10 bg-white border-b border-[#E5E5E5]">
        <View className="flex-row items-center space-x-1 px-[15px] my-[10px] pb-[10px]">
          <Icon name="x" size={20} />
          <Image
            source={require("../../assets/SetBudgetIncome.png")}
            className="w-[50%] h-[90%]"
          />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mx-[20px]">
          <Text className="text-[25px] font-poppins font-light text-[#000000]">
            Create a Budget {"\n"}Income
          </Text>
          <View className="flex-col items-start mt-[25px]">
            <Text className="font-poppins-medium text-[16px] text-[#000000]">
              Select wallet account
            </Text>
            <FlatList
              data={walletsData}
              renderItem={renderWalletItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={true}
              className="mt-[10px]"
            />
          </View>

          <View className="flex-col items-start mt-[25px]">
            <Text className="font-poppins-medium text-[16px] text-[#000000]">
              Select Category
            </Text>
            <FlatList
              data={incomeCategoriesData}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={true}
              className="mt-[10px]"
            />
          </View>

          <View className="flex-col items-start mt-[25px]">
            <Text className="font-poppins-medium text-[16px] text-[#000000]">
              Amount
            </Text>
            <TextInput
              className="bg-white border border-gray-100 rounded-lg p-3 w-full mt-[10px] font-poppins text-[16px] text-gray-800"
              placeholder="PHP 00,000.00"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View className="flex-col items-start mt-[25px]">
            <Text className="font-poppins-medium text-[16px] text-[#000000]">
              Note
            </Text>
            <TextInput
              className="bg-white border border-gray-100 rounded-lg p-3 w-full h-[120px] mt-[10px] font-poppins text-[16px] text-gray-800 text-left"
              placeholder="Add notes"
              placeholderTextColor="#A0A0A0"
              value={notes}
              onChangeText={setNotes}
              multiline
              textAlignVertical="top"
              numberOfLines={6}
            />
          </View>

          <View className="flex-row justify-end mt-[20px]">
            <TouchableOpacity
              className="bg-[#154272] rounded-md p-4 w-[100px] items-center"
              onPress={handleSave}
            >
              <Text className="text-white font-poppins-medium text-[16px]">
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddIncome;
