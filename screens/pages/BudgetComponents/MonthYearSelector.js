import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";

const MonthYearSelector = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  mockUser,
  months,
}) => {
  const [isMonthDropdownVisible, setMonthDropdownVisible] = useState(false);
  const [isYearDropdownVisible, setYearDropdownVisible] = useState(false);

  // Generate years from current year - 5 to current year + 5
  const years = Array.from({ length: 11 }, (_, i) => ({
    label: (selectedYear - 5 + i).toString(),
    value: selectedYear - 5 + i,
  }));

  // Determine allowed months/years for non-premium users
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const allowedMonths = [
    currentMonth,
    (currentMonth - 1 + 12) % 12,
    (currentMonth - 2 + 12) % 12,
  ];
  const allowedYears = [currentYear, currentYear - 1, currentYear - 2];

  const handlePreviousMonth = () => {
    const newMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
    const newYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;

    if (
      !mockUser.isPremium &&
      (!allowedMonths.includes(newMonth) || !allowedYears.includes(newYear))
    ) {
      Alert.alert(
        "Premium Required",
        "This month is available only for premium users."
      );
      return;
    }

    setSelectedMonth(newMonth);
    if (selectedMonth === 0) {
      setSelectedYear(newYear);
    }
  };

  const handleNextMonth = () => {
    const newMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    const newYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;

    if (
      !mockUser.isPremium &&
      (!allowedMonths.includes(newMonth) || !allowedYears.includes(newYear))
    ) {
      Alert.alert(
        "Premium Required",
        "This month is available only for premium users."
      );
      return;
    }

    setSelectedMonth(newMonth);
    if (selectedMonth === 11) {
      setSelectedYear(newYear);
    }
  };

  const handleMonthSelect = (value) => {
    if (!mockUser.isPremium && !allowedMonths.includes(value)) {
      Alert.alert(
        "Premium Required",
        "This month is available only for premium users."
      );
      return;
    }
    setSelectedMonth(value);
    setMonthDropdownVisible(false);
  };

  const handleYearSelect = (value) => {
    if (!mockUser.isPremium && !allowedYears.includes(value)) {
      Alert.alert(
        "Premium Required",
        "This year is available only for premium users."
      );
      return;
    }
    setSelectedYear(value);
    setYearDropdownVisible(false);
  };

  const renderDropdownItem = ({ item, onPress, isPremiumRestricted }) => (
    <TouchableOpacity
      className={`px-4 py-2 ${
        isPremiumRestricted && !mockUser.isPremium ? "opacity-50" : ""
      }`}
      onPress={() => onPress(item.value)}
      disabled={isPremiumRestricted && !mockUser.isPremium}
    >
      <Text
        className={`text-base ${
          isPremiumRestricted && !mockUser.isPremium
            ? "text-gray-400"
            : "text-black"
        }`}
      >
        {item.label}{" "}
        {isPremiumRestricted && !mockUser.isPremium ? "(Premium)" : ""}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="items-center justify-between px-[10px] py-[10px] mx-[20%] mt-[10px]">
      <View className="flex-row items-center justify-between w-full">
        <TouchableOpacity onPress={handlePreviousMonth}>
          <Icon name="chevron-left" size={20} color="black" />
        </TouchableOpacity>
        <View className="flex-row items-center space-x-2">
          {/* Month Dropdown */}
          <TouchableOpacity onPress={() => setMonthDropdownVisible(true)}>
            <Text className="font-poppins-medium text-[14px]">
              {months[selectedMonth].label},
            </Text>
          </TouchableOpacity>
          <Modal
            transparent
            visible={isMonthDropdownVisible}
            animationType="fade"
            onRequestClose={() => setMonthDropdownVisible(false)}
          >
            <TouchableWithoutFeedback
              onPress={() => setMonthDropdownVisible(false)}
            >
              <View className="flex-1 bg-black/30">
                <View className="bg-white rounded-lg shadow-lg mt-[120px] mx-10 max-h-[200px]">
                  <FlatList
                    data={months}
                    renderItem={({ item }) =>
                      renderDropdownItem({
                        item,
                        onPress: handleMonthSelect,
                        isPremiumRestricted: !allowedMonths.includes(
                          item.value
                        ),
                      })
                    }
                    keyExtractor={(item) => item.value.toString()}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/* Year Dropdown */}
          <TouchableOpacity onPress={() => setYearDropdownVisible(true)}>
            <Text className="font-poppins-medium text-[14px]">
              {selectedYear}
            </Text>
          </TouchableOpacity>
          <Modal
            transparent
            visible={isYearDropdownVisible}
            animationType="fade"
            onRequestClose={() => setYearDropdownVisible(false)}
          >
            <TouchableWithoutFeedback
              onPress={() => setYearDropdownVisible(false)}
            >
              <View className="flex-1 bg-black/30">
                <View className="bg-white rounded-lg shadow-lg mt-[120px] mx-10 max-h-[200px]">
                  <FlatList
                    data={years}
                    renderItem={({ item }) =>
                      renderDropdownItem({
                        item,
                        onPress: handleYearSelect,
                        isPremiumRestricted: !allowedYears.includes(item.value),
                      })
                    }
                    keyExtractor={(item) => item.value.toString()}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        <TouchableOpacity onPress={handleNextMonth}>
          <Icon name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MonthYearSelector;
