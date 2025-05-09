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

// Use wallet data from mockData.json
const walletsData = mockData.walletScreen.wallets;

const AddTransfer = () => {
  const [selectedFromWallet, setSelectedFromWallet] = useState(null);
  const [selectedFromWalletData, setSelectedFromWalletData] = useState(null);
  const [selectedToWallet, setSelectedToWallet] = useState(null);
  const [selectedToWalletData, setSelectedToWalletData] = useState(null);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  // Auto-select the first wallet for "From" and second wallet for "To" on component mount
  useEffect(() => {
    if (walletsData.length > 0) {
      const firstWallet = walletsData[0];
      setSelectedFromWallet(firstWallet.id);
      setSelectedFromWalletData(firstWallet);
      console.log("Auto-selected From Wallet from mockData:", firstWallet);
    }
    if (walletsData.length > 1) {
      const secondWallet = walletsData[1];
      setSelectedToWallet(secondWallet.id);
      setSelectedToWalletData(secondWallet);
      console.log("Auto-selected To Wallet from mockData:", secondWallet);
    }
  }, []);

  const handleFromWalletSelect = (wallet) => {
    setSelectedFromWallet(wallet.id);
    setSelectedFromWalletData(wallet);
    console.log("Selected From Wallet from mockData:", wallet);
  };

  const handleToWalletSelect = (wallet) => {
    setSelectedToWallet(wallet.id);
    setSelectedToWalletData(wallet);
    console.log("Selected To Wallet from mockData:", wallet);
  };

  const handleSave = () => {
    console.log("Transfer Data:", {
      fromWallet: selectedFromWalletData,
      toWallet: selectedToWalletData,
      amount: amount,
      notes: notes,
    });
  };

  const renderWalletItem = ({ item, isFromWallet }) => {
    const isSelected = isFromWallet
      ? selectedFromWallet === item.id
      : selectedToWallet === item.id;
    return (
      <TouchableOpacity
        className={`bg-[#ffffff] rounded-[10px] p-[10px] mr-[6px] w-[150px] ${
          isSelected
            ? "border-[#007AFF] border-[1px] shadow-md"
            : "border-[#E5E5E5] border-[1px]"
        }`}
        onPress={() =>
          isFromWallet
            ? handleFromWalletSelect(item)
            : handleToWalletSelect(item)
        }
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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" BarStyle="dark-content" />
      {/* Sticky Header */}
      <View className="z-10 bg-white border-b border-[#E5E5E5]">
        <View className="flex-row items-center space-x-1 px-[15px] my-[10px] pb-[10px]">
          <Icon name="x" size={20} />
          <Image
            source={require("../../assets/SetBudgetTransfer.png")}
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
            Create a Budget {"\n"}Transfer
          </Text>
          <View className="flex-col items-start mt-[25px]">
            <Text className="font-poppins-medium text-[16px] text-[#000000]">
              Select from Wallet Account
            </Text>
            <FlatList
              data={walletsData}
              renderItem={({ item }) =>
                renderWalletItem({ item, isFromWallet: true })
              }
              keyExtractor={(item) => `from-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={true}
              className="mt-[10px]"
            />
          </View>

          <View className="flex-col items-start mt-[25px]">
            <Text className="font-poppins-medium text-[16px] text-[#000000]">
              Transfer to Wallet Account
            </Text>
            <FlatList
              data={walletsData}
              renderItem={({ item }) =>
                renderWalletItem({ item, isFromWallet: false })
              }
              keyExtractor={(item) => `to-${item.id}`}
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

export default AddTransfer;
