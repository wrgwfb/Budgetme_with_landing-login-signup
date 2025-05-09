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
import mockData from "../../assets/data/mockData.json";

// Icon paths for wallets
const walletIconPaths = {
  CreditCardVisaIcon: require("../../assets/walletIcons/CreditCardVisa.png"),
  CashWalletIcon: require("../../assets/walletIcons/CashWallet.png"),
  EWalletPayPalIcon: require("../../assets/walletIcons/EWalletPayPal.png"),
  SavingsBankIcon: require("../../assets/walletIcons/SavingsBank.png"),
};

// Icon paths for categories
const categoryIconPaths = {
  ExpenseUtilitiesIcon: require("../../assets/categoryIcons/ExpenseUtilities.png"),
  ExpenseGroceriesIcon: require("../../assets/categoryIcons/ExpenseGroceries.png"),
  ExpenseRentIcon: require("../../assets/categoryIcons/ExpenseRent.png"),
  ExpenseEntertainmentIcon: require("../../assets/categoryIcons/ExpenseEntertainment.png"),
  ExpenseTravelIcon: require("../../assets/categoryIcons/ExpenseTravel.png"),
};

// Use wallet and category data from mockData.json
const walletsData = mockData.walletScreen.wallets;
const expenseCategoriesData = mockData.walletScreen.expenseCategories;

const AddExpense = ({ route, navigation }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedWalletData, setSelectedWalletData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const { category } = route.params || {}; // Get category from navigation params

  // Auto-select first wallet and pre-select category from params
  useEffect(() => {
    console.log("route.params:", route.params); // Debug: Log params
    console.log("expenseCategoriesData:", expenseCategoriesData); // Debug: Log categories

    if (walletsData.length > 0) {
      const firstWallet = walletsData[0];
      setSelectedWallet(firstWallet.id);
      setSelectedWalletData(firstWallet);
      console.log("Auto-selected Wallet from mockData:", firstWallet);
    }

    if (category && (category.name || category.title)) {
      // Normalize category name (try name or title)
      const categoryName = (
        category.name ||
        category.title ||
        ""
      ).toLowerCase();
      // Find matching category by title
      const matchedCategory = expenseCategoriesData.find(
        (cat) => cat.title && cat.title.toLowerCase() === categoryName
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory.id);
        setSelectedCategoryData(matchedCategory);
        console.log(
          "Pre-selected Category from params (matched):",
          matchedCategory
        );
      } else {
        console.warn("No matching category found for:", category);
        // Fallback to first category
        if (expenseCategoriesData.length > 0) {
          const firstCategory = expenseCategoriesData[0];
          setSelectedCategory(firstCategory.id);
          setSelectedCategoryData(firstCategory);
          console.log(
            "Fallback Auto-selected Category from mockData:",
            firstCategory
          );
        }
      }
    } else if (expenseCategoriesData.length > 0) {
      const firstCategory = expenseCategoriesData[0];
      setSelectedCategory(firstCategory.id);
      setSelectedCategoryData(firstCategory);
      console.log("Auto-selected Category from mockData:", firstCategory);
    }
  }, [category]);

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet.id);
    setSelectedWalletData(wallet);
    console.log("Selected Wallet from mockData:", wallet);
  };

  const handleCategorySelect = (categoryItem) => {
    setSelectedCategory(categoryItem.id);
    setSelectedCategoryData(categoryItem);
    console.log("Selected Category from FlatList:", categoryItem);
  };

  const handleSave = () => {
    console.log("Expense Data:", {
      wallet: selectedWalletData,
      category: selectedCategoryData,
      amount: amount,
      notes: notes,
    });
    navigation.goBack();
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
          <Text className="font-poppins text-[12px] text-[#000000]">
            {item.type}
          </Text>
          <Text className="font-poppins text-[14px] text-[#26bb4b]">
            PHP {item.balance.toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryItem = ({ item }) => {
    const isSelected = selectedCategory === item.id;
    const isLocked =
      category &&
      item.title &&
      (category.name || category.title) &&
      item.title.toLowerCase() ===
        (category.name || category.title).toLowerCase();

    // Use TouchableOpacity if no pre-selected category, otherwise View
    const Container = category ? View : TouchableOpacity;

    return (
      <Container
        className={`flex-row items-center bg-white border rounded-lg p-2 mr-[6px] w-[200px] ${
          isSelected
            ? "border-[#007AFF] border-[1px] shadow-md"
            : "border-gray-100 border-[1px]"
        } ${isLocked ? "opacity-100" : category ? "opacity-50" : ""}`}
        onPress={category ? null : () => handleCategorySelect(item)}
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
            {item.title || "Unknown"}
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
      </Container>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" BarStyle="dark-content" />
      {/* Sticky Header */}
      <View className="z-10 bg-white border-b border-[#E5E5E5]">
        <View className="flex-row items-center space-x-1 px-[15px] my-[10px] pb-[10px]">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="x" size={20} />
          </TouchableOpacity>
          <Image
            source={require("../../assets/SetBudgetExpense.png")}
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
            Create a Budget {"\n"}Expense
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
              data={expenseCategoriesData}
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

export default AddExpense;
