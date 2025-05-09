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
import categoryIconSets from "../../assets/data/categoryIconSets.json";

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

const categoryTypes = [
  { label: "Income", value: "Income" },
  { label: "Expense", value: "Expense" },
];

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

const AddCategoryModal = ({
  isVisible,
  onClose,
  isPremium = false,
  onAddCategory,
}) => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryType, setCategoryType] = useState(categoryTypes[0].value);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [categoryValue, setCategoryValue] = useState(""); // State for value

  const handleAddCategory = () => {
    if (!categoryTitle || !categoryType || !selectedIcon || !categoryValue) {
      alert(
        "Please fill in all fields, select a type, select an icon, and enter a value."
      );
      return;
    }

    // Validate that the value is a number
    const value = parseFloat(categoryValue);
    if (isNaN(value) || value < 0) {
      alert("Please enter a valid positive number for the value.");
      return;
    }

    // Add the category to the appropriate list (Income or Expense)
    const newCategory = {
      id: Date.now(), // Temporary ID; adjust based on your data structure
      title: categoryTitle,
      icon: selectedIcon,
      type: categoryType,
      value: value, // Include the value
    };

    onAddCategory(categoryType, newCategory);

    // Reset fields and close modal
    setCategoryTitle("");
    setCategoryType(categoryTypes[0].value);
    setSelectedIcon(null);
    setCategoryValue("");
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

  // Show icons based on the selected category type
  const currentIcons = categoryIconSets.iconSets[categoryType] || [];

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
              Add New Category
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="x" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Category Title Input */}
          <Text className="text-sm font-poppins text-gray-600 mb-2">
            Category Title
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4 font-poppins text-gray-800"
            placeholder="e.g., Salary"
            value={categoryTitle}
            onChangeText={setCategoryTitle}
          />

          {/* Category Type Dropdown */}
          <Text className="text-sm font-poppins text-gray-600 mb-2">
            Category Type
          </Text>
          <View className="border border-gray-300 rounded-lg mb-4">
            <Picker
              selectedValue={categoryType}
              onValueChange={(itemValue) => {
                setCategoryType(itemValue);
                setSelectedIcon(null); // Reset icon selection when type changes
              }}
              style={{
                fontFamily: "Poppins-Regular",
                color: "#1f2937",
              }}
            >
              {categoryTypes.map((type) => (
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
          <TouchableOpacity
            className="bg-blue-600 rounded-lg p-4 items-center"
            onPress={handleAddCategory}
          >
            <Text className="text-white font-poppins font-semibold text-base">
              Add Category
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddCategoryModal;
