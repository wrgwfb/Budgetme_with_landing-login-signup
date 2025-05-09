import { SafeAreaView, ScrollView, View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import budgetingData from "../../assets/data/budgetingData.json";
import categoryIconSets from "../../assets/data/categoryIconSets.json";
import Header from "./BudgetComponents/Header";
import MonthYearSelector from "./BudgetComponents/MonthYearSelector";
import BudgetSummary from "./BudgetComponents/BudgetSummary";
import BudgetCategoryCard from "./BudgetComponents/BudgetCategoryCard";
import NotBudgetedCategoryCard from "./BudgetComponents/NotBudgetedCategoryCard";

// Import icons
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

const Budget = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Mock user data
  const mockUser = {
    isPremium: false, // Set to true to simulate a premium user
  };

  const months = [
    { label: "January", value: 0 },
    { label: "February", value: 1 },
    { label: "March", value: 2 },
    { label: "April", value: 3 },
    { label: "May", value: 4 },
    { label: "June", value: 5 },
    { label: "July", value: 6 },
    { label: "August", value: 7 },
    { label: "September", value: 8 },
    { label: "October", value: 9 },
    { label: "November", value: 10 },
    { label: "December", value: 11 },
  ];

  // Get budget data for selected month/year
  const budget = budgetingData.budgetData.find(
    (data) =>
      data.month === months[selectedMonth].label && data.year === selectedYear
  );

  // Get not budgeted categories (only Expense)
  const budgetedIcons = budget ? budget.categories.map((cat) => cat.icon) : [];
  const notBudgetedCategories = categoryIconSets.iconSets.Expense.map(
    (cat) => ({
      name: cat.name,
      key: cat.key,
      type: "Expense",
      isPremium: cat.isPremium,
    })
  ).filter((cat) => !budgetedIcons.includes(cat.key));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />
      <Header />
      <MonthYearSelector
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        mockUser={mockUser}
        months={months}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="mt-4 px-5">
          {budget ? (
            <>
              <BudgetSummary budget={budget} formatCurrency={formatCurrency} />
              <View className="mt-3">
                <Text className="text-lg font-poppins font-bold text-gray-800 mb-3">
                  Budget Categories
                </Text>
                <FlatList
                  data={budget.categories}
                  renderItem={({ item }) => (
                    <BudgetCategoryCard
                      item={item}
                      iconMap={iconMap}
                      formatCurrency={formatCurrency}
                      mockUser={mockUser}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                />
              </View>
            </>
          ) : (
            <Text className="text-base font-poppins text-gray-600 text-center">
              No budget data available for {months[selectedMonth].label}{" "}
              {selectedYear}
            </Text>
          )}
        </View>
        <View className="mt-2 px-5 mb-[70px]">
          <Text className="text-lg font-poppins font-bold text-gray-800 mb-3">
            Not Budgeted This Month
          </Text>
          {notBudgetedCategories.length > 0 ? (
            <FlatList
              data={notBudgetedCategories}
              renderItem={({ item }) => (
                <NotBudgetedCategoryCard
                  item={item}
                  iconMap={iconMap}
                  mockUser={mockUser}
                />
              )}
              keyExtractor={(item) => item.key}
              scrollEnabled={false}
            />
          ) : (
            <Text className="text-base font-poppins text-gray-600 text-center">
              All expense categories are budgeted for this month.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Budget;
