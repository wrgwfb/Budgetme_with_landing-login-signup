import { View, Text } from "react-native";
import React from "react";

const BudgetSummary = ({ budget, formatCurrency }) => {
  return (
    <>
      <Text className="text-lg font-poppins font-bold text-gray-800 mb-3">
        Budget for {budget.month} {budget.year}
      </Text>
      <View className="space-y-1">
        <Text className="text-base font-poppins text-gray-600 text-[14px]">
          Total Budget:
        </Text>
        <Text className="font-bold text-[18px]">
          {formatCurrency(budget.totalBudget)}
        </Text>
      </View>
      {/* Progress Bar */}
      <View className="w-full h-[10px] bg-gray-300 rounded-full mb-2 mt-[10px]">
        <View
          className="bg-blue-600 h-[10px] rounded-full"
          style={{
            width: `${
              budget.totalBudget > 0
                ? Math.min((budget.totalSpent / budget.totalBudget) * 100, 100)
                : 0
            }%`,
          }}
        />
      </View>
      <Text className="text-base font-poppins text-gray-600">
        Total Spent: {formatCurrency(budget.totalSpent)}
      </Text>
    </>
  );
};

export default BudgetSummary;
