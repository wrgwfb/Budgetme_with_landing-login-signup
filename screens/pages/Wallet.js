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
import AddWalletModal from "../ModalComponent/AddWalletModal";

// Import all icons from iconSets.json
import CreditCardVisaIcon from "../../assets/walletIcons/CreditCardVisa.png";
import CreditCardMasterIcon from "../../assets/walletIcons/CreditCardMaster.png";
import CreditCardAmexIcon from "../../assets/walletIcons/CreditCardAmex.png";
import CreditCardDiscoverIcon from "../../assets/walletIcons/CreditCardDiscover.png";
import CreditCardUnionPayIcon from "../../assets/walletIcons/CreditCardUnionPay.png";
import SavingsBankIcon from "../../assets/walletIcons/SavingsBank.png";
import SavingsPiggyIcon from "../../assets/walletIcons/Savings.png";
import SavingsVaultIcon from "../../assets/walletIcons/SavingsVault.png";
import SavingsSafeIcon from "../../assets/walletIcons/SavingsSafe.png";
import SavingsInvestmentIcon from "../../assets/walletIcons/SavingsInvestment.png";
import CashWalletIcon from "../../assets/walletIcons/CashWallet.png";
import CashMoneyBagIcon from "../../assets/walletIcons/CashMoneyBag.png";
import CashCoinsIcon from "../../assets/walletIcons/CashCoins.png";
import CashBillsIcon from "../../assets/walletIcons/Cash.png";
import CashStackIcon from "../../assets/walletIcons/CashStack.png";
import EWalletPayPalIcon from "../../assets/walletIcons/EWalletPayPal.png";
import EWalletVenmoIcon from "../../assets/walletIcons/EWalletVenmo.png";
import EWalletApplePayIcon from "../../assets/walletIcons/EWalletApplePay.png";
import EWalletGooglePayIcon from "../../assets/walletIcons/EWalletGooglePay.png";
import EWalletCryptoIcon from "../../assets/walletIcons/EWalletCrypto.png";

const { width, height } = Dimensions.get("window");

// Updated iconMap to include all icons from iconSets.json
// Map legacy mockData icons to specific new icons for compatibility
const iconMap = {
  // Legacy icons from mockData.json
  CreditCardIcon: CreditCardVisaIcon, // Map to a specific Credit Card icon
  CashIcon: CashWalletIcon, // Map to a specific Cash icon
  EWalletIcon: EWalletPayPalIcon, // Map to a specific E-Wallet icon
  SavingsIcon: SavingsBankIcon, // Map to a specific Savings icon
  // New icons from iconSets.json (used by AddWalletModal)
  CreditCardVisaIcon,
  CreditCardMasterIcon,
  CreditCardAmexIcon,
  CreditCardDiscoverIcon,
  CreditCardUnionPayIcon,
  SavingsBankIcon,
  SavingsPiggyIcon,
  SavingsVaultIcon,
  SavingsSafeIcon,
  SavingsInvestmentIcon,
  CashWalletIcon,
  CashMoneyBagIcon,
  CashCoinsIcon,
  CashBillsIcon,
  CashStackIcon,
  EWalletPayPalIcon,
  EWalletVenmoIcon,
  EWalletApplePayIcon,
  EWalletGooglePayIcon,
  EWalletCryptoIcon,
};

const Wallet = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(null); // Track which wallet's menu is visible
  const [isModalVisible, setIsModalVisible] = useState(false); // Track modal visibility

  const toggleMenu = (id) => {
    setMenuVisible(menuVisible === id ? null : id);
  };

  const handleOptionPress = (option, walletId) => {
    console.log(`Selected ${option} for wallet ${walletId}`);
    setMenuVisible(null); // Close menu after selection
    // Implement actual logic for edit, delete, or create budget here
  };

  // Use mock data from JSON
  const { accountBalance, totalExpenses, totalIncome, wallets } =
    mockData.walletScreen;

  return (
    <SafeAreaView className="flex-1">
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

      {/* Content Overlay */}
      <View className="flex-1 bg-transparent">
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
        <View className="flex-1 items-center mt-6">
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

        {/* Bottom White Container */}
        <View className="absolute bottom-0 w-full h-[72%] bg-white rounded-t-3xl shadow-lg">
          <ScrollView className="px-5 pt-4">
            <Text className="text-xl font-poppins font-bold text-gray-800 mb-4">
              My Wallet
            </Text>
            {wallets.map((wallet) => (
              <View key={wallet.id} className="mb-3">
                <View className="flex-row items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative">
                  <View className="flex-shrink-0 border-[1px] mr-[10px] border-gray-200 rounded-[5px] p-1 bg-white">
                    <Image
                      source={iconMap[wallet.icon]}
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                  </View>
                  <View className="flex-1 space-y-[-5px]">
                    <Text className="text-base font-poppins font-semibold text-gray-800 uppercase">
                      {wallet.title}
                    </Text>
                    <Text className="text-sm font-poppins text-gray-600">
                      Balance:{" "}
                      <Text className="font-bold text-[#23a35d]">
                        PHP{" "}
                        {wallet.balance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleMenu(wallet.id)}
                    className="absolute right-4"
                  >
                    <Icon name="more-vertical" size={20} color="#000000" />
                  </TouchableOpacity>
                </View>
                {menuVisible === wallet.id && (
                  <View className="absolute right-4 top-12 bg-white rounded-lg shadow-md p-2 border border-gray-200 z-10">
                    <TouchableOpacity
                      className="py-2 px-4"
                      onPress={() => handleOptionPress("Edit", wallet.id)}
                    >
                      <Text className="text-sm font-poppins text-gray-700">
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="py-2 px-4"
                      onPress={() => handleOptionPress("Delete", wallet.id)}
                    >
                      <Text className="text-sm font-poppins text-gray-700">
                        Delete
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="py-2 px-4"
                      onPress={() =>
                        handleOptionPress("Create Budget", wallet.id)
                      }
                    >
                      <Text className="text-sm font-poppins text-gray-700">
                        Create Budget
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
            <TouchableOpacity
              className="bg-[#FFFFFF] rounded-lg p-3 shadow-md flex-row items-center justify-center mx-[20%]"
              style={{
                borderStyle: "dashed",
                borderWidth: 2,
                borderColor: "#d1d5db",
              }}
              onPress={() => setIsModalVisible(true)}
            >
              <Icon name="plus" size={24} color="#424242" />
              <Text className="text-[#424242] font-poppins font-semibold text-base ml-2">
                Add Wallet
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      {/* Add Wallet Modal */}
      <AddWalletModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        isPremium={false} // Adjust based on your user’s premium status
      />
    </SafeAreaView>
  );
};

export default Wallet;
