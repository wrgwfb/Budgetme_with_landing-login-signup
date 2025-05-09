import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Feather";
import iconSets from "../../assets/data/iconSets.json";

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

const walletTypes = [
  { label: "Credit Card", value: "CreditCard" },
  { label: "Savings", value: "Savings" },
  { label: "Cash", value: "Cash" },
  { label: "E-Wallet", value: "EWallet" },
];

// Map icon keys to imported assets
const iconMap = {
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

const AddWalletModal = ({ isVisible, onClose, isPremium = false }) => {
  const [walletTitle, setWalletTitle] = useState("");
  const [balance, setBalance] = useState("");
  const [selectedType, setSelectedType] = useState(walletTypes[0].value);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleAddWallet = () => {
    if (!walletTitle || !balance || !selectedIcon) {
      alert("Please fill in all fields, select a type, and select an icon.");
      return;
    }

    // Logic to add the wallet (e.g., save to state, API, or mockData)
    console.log("New Wallet:", {
      title: walletTitle,
      balance: parseFloat(balance),
      icon: selectedIcon,
      type: selectedType,
    });

    // Reset fields and close modal
    setWalletTitle("");
    setBalance("");
    setSelectedType(walletTypes[0].value);
    setSelectedIcon(null);
    onClose();
  };

  const handleIconSelect = (icon) => {
    if (icon.isPremium && !isPremium) {
      alert("This icon is premium. Upgrade to a premium account to use it.");
      return;
    }
    setSelectedIcon(icon.key);
  };

  const renderIconOption = ({ item }) => (
    <TouchableOpacity
      className="items-center mx-2"
      onPress={() => handleIconSelect(item)}
      disabled={item.isPremium && !isPremium}
    >
      <View
        className={`p-2 rounded-lg ${
          selectedIcon === item.key
            ? "bg-blue-100 border-blue-500"
            : item.isPremium && !isPremium
            ? "bg-gray-200 border-gray-400 opacity-50"
            : "bg-white border-gray-300"
        } border`}
      >
        <Image
          source={iconMap[item.key]}
          className="w-8 h-8"
          resizeMode="contain"
        />
      </View>
      <Text className="text-xs font-poppins text-gray-700 mt-1">
        {item.name}
      </Text>
      {item.isPremium && (
        <Text className="text-xs font-poppins text-red-500">Premium</Text>
      )}
    </TouchableOpacity>
  );

  const currentIcons = iconSets.iconSets[selectedType] || [];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-6 w-[90%] shadow-lg">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-poppins font-bold text-gray-800">
              Add New Wallet
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="x" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Wallet Title Input */}
          <Text className="text-sm font-poppins text-gray-600 mb-2">
            Wallet Title
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4 font-poppins text-gray-800"
            placeholder="e.g., Personal Savings"
            value={walletTitle}
            onChangeText={setWalletTitle}
          />

          {/* Balance Input */}
          <Text className="text-sm font-poppins text-gray-600 mb-2">
            Initial Balance (PHP)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4 font-poppins text-gray-800"
            placeholder="e.g., 1000.00"
            value={balance}
            onChangeText={setBalance}
            keyboardType="numeric"
          />

          {/* Wallet Type Dropdown */}
          <Text className="text-sm font-poppins text-gray-600 mb-2">
            Wallet Type
          </Text>
          <View className="border border-gray-300 rounded-lg mb-4">
            <Picker
              selectedValue={selectedType}
              onValueChange={(itemValue) => {
                setSelectedType(itemValue);
                setSelectedIcon(null); // Reset icon selection when type changes
              }}
              style={{
                fontFamily: "Poppins-Regular",
                color: "#1f2937",
              }}
            >
              {walletTypes.map((type) => (
                <Picker.Item
                  key={type.value}
                  label={type.label}
                  value={type.value}
                />
              ))}
            </Picker>
          </View>

          {/* Icon Selection */}
          <Text className="text-sm font-poppins text-gray-600 mb-2">
            Select Icon
          </Text>
          <FlatList
            data={currentIcons}
            renderItem={renderIconOption}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            keyExtractor={(item) => item.key}
          />

          {/* Add Button */}
          <View className="flex-row justify-end space-x-2">
            <TouchableOpacity
              className="bg-[#ffffff]  border border-[#000000] rounded-lg p-3 items-center"
              onPress={onClose}
            >
              <Text className="text-[#000000] font-poppins font-semibold text-base">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#054396] rounded-lg p-3 items-center"
              onPress={handleAddWallet}
            >
              <Text className="text-white font-poppins font-semibold text-base">
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddWalletModal;
