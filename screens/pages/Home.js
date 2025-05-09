import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
  Rect,
} from "react-native-svg";
import { BarChart } from "react-native-chart-kit";
import logo from "../../assets/Image/Logo.png"; // Replace with your logo asset
import walletCoins from "../../assets/img.png"; // Adjust path to your wallet and coins image
import mockData from "../../assets/data/mockData.json";
import { StatusBar } from "expo-status-bar";

const Home = ({ navigation }) => {
  // Use mock data from JSON
  const { accountBalance, chartData } = mockData.homeScreen;

  // State for selected tab and lock message
  const [selectedTab, setSelectedTab] = useState("Weekly");
  const [lockMessageOpacity] = useState(new Animated.Value(0));

  // Handle tab press
  const handleTabPress = (tab) => {
    if (tab === "Monthly" || tab === "Daily") {
      // Show lock message animation
      Animated.sequence([
        Animated.timing(lockMessageOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(lockMessageOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setSelectedTab(tab);
    }
  };

  // Render chart
  const renderChart = () => {
    if (selectedTab !== "Weekly") {
      return (
        <View className="h-40 justify-center items-center">
          <Icon name="lock" size={24} color="#6B7280" />
          <Text className="font-poppins text-gray-500 mt-2">
            This feature is locked. Upgrade to premium!
          </Text>
        </View>
      );
    }

    // Prepare data for BarChart
    const chartConfig = {
      backgroundGradientFrom: "#fff",
      backgroundGradientTo: "#fff",
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16,
        paddingLeft: 0, // Minimize left padding
      },
      propsForBackgroundLines: {
        strokeWidth: 0, // Hide grid lines
      },
      propsForLabels: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
      },
      fillShadowGradient: "#9E77ED",
      fillShadowGradientOpacity: 1,
      fillShadowGradientFrom: "#9E77ED30",
      fillShadowGradientTo: "#9E77ED",
    };

    const data = {
      labels: chartData.map((d) => d.month),
      datasets: [
        {
          data: chartData.map((d) => d.value),
          colors: chartData.map((_, index) =>
            index % 2 === 0 ? () => "#dbcbfc30" : () => "#4609c0"
          ),
        },
      ],
    };

    // Find the highest bar to position the value label
    const maxValue = Math.max(...chartData.map((d) => d.value));
    const maxIndex = chartData.findIndex((d) => d.value === maxValue);
    const barWidth = (Dimensions.get("window").width - 16) / chartData.length;
    const labelX = Math.min(
      Math.max(maxIndex * barWidth + barWidth / 2 - 30, 10),
      Dimensions.get("window").width - 16 - 0
    ); // Ensure label stays within bounds

    return (
      <View className="flex-1 mr-6">
        <BarChart
          data={data}
          width={Dimensions.get("window").width - 16}
          height={200}
          chartConfig={chartConfig}
          yAxisInterval={10}
          yAxisLabel=""
          yAxisSuffix=""
          showValuesOnTopOfBars={false}
          fromZero={true}
          withCustomBarColorFromData={true}
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
          flexGrow: 1,
        }}
      >
        {/* Top Container Header */}
        <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-300 h-16 bg-white">
          <Image
            source={logo}
            style={{ width: 94, height: 40 }}
            resizeMode="contain"
          />
          <TouchableOpacity className="p-2 rounded-md border border-gray-400">
            <Icon name="bell" size={16} color="#0e0d0d" />
          </TouchableOpacity>
        </View>
        {/* Main Content */}
        <View className="px-4 pt-6">
          {/* Title and Illustration Section */}
          <View className="flex-row items-center justify-between">
            {/* Left: Title and Button */}
            <View className="flex-1 pr-4 ">
              <View className="space-y-[-5px]">
                <Text className="text-3xl font-poppins-medium">Track Your</Text>
                <Text className="text-3xl font-poppins-medium">Spending,</Text>

                <Svg height="65" width="250">
                  <Defs>
                    <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <Stop offset="50%" stopColor="#054396" />
                      <Stop offset="100%" stopColor="#021530" />
                    </LinearGradient>
                  </Defs>

                  <SvgText
                    fill="url(#grad)"
                    fontFamily="Poppins_700Bold"
                    fontSize="28"
                    x="0"
                    y="28"
                  >
                    Stay On
                  </SvgText>

                  <Rect x="0" y="30" width="100" height="2" fill="url(#grad)" />
                  <SvgText
                    fill="url(#grad)"
                    fontFamily="Poppins_700Bold"
                    fontSize="28"
                    x="0"
                    y="56"
                  >
                    Budget
                  </SvgText>
                  <Rect x="0" y="58" width="80" height="2" fill="url(#grad)" />
                </Svg>
              </View>
              <Text className="font-poppins text-sm text-gray-500 mt-[10px]">
                Upgrade for full access
              </Text>
              <TouchableOpacity className="flex-row items-center rounded-full justify-between bg-[#054396] px-4 py-3 mt-4 w-48" 
              onPress={() => navigation.navigate("AvailPremiumPage")}>
                <Text className="font-poppins-medium text-white text-base">
                  Go to premium
                </Text>
                <Icon name="arrow-right" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Image
              source={walletCoins}
              style={{ width: 140, height: 120 }}
              resizeMode="contain"
              className="ml-4 absolute bottom-0 right-0 top-[15px]"
            />
          </View>

          {/* Bar Chart Section */}
          <View className="mt-8 bg-white rounded-lg shadow-md">
            <View className="mb-2">
              <Text className="font-poppins-regular text-lg">
                Account Balance
              </Text>
              <Text className="font-poppins-medium text-[25px]">
                {accountBalance}
              </Text>
            </View>

            {/* Tab Navigation */}
            <View className="flex-row justify-start space-x-4 mb-2 ">
              {["Monthly", "Weekly", "Daily"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  className={`flex-row items-center py-1 border-b border-b-gray-100 shadow-md ${
                    selectedTab === tab && tab === "Weekly"
                      ? "border-b-2 border-blue-500"
                      : ""
                  } ${tab !== "Weekly" ? "opacity-50" : ""}`}
                  onPress={() => handleTabPress(tab)}
                  disabled={tab !== "Weekly"}
                >
                  <Text
                    className={`font-poppins-medium text-base ${
                      selectedTab === tab && tab === "Weekly"
                        ? "text-blue-500"
                        : "text-gray-700"
                    }`}
                  >
                    {tab}
                  </Text>
                  {tab !== "Weekly" && (
                    <Icon
                      name="lock"
                      size={16}
                      color="#6B7280"
                      style={{ marginLeft: 4 }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex-1 justify-center items-center mb-4">
              {/* Chart */}
              {renderChart()}
            </View>
            {/* Lock Message */}
            <Animated.View
              style={{
                opacity: lockMessageOpacity,
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text className="font-poppins text-red-500">
                This feature is locked. Upgrade to premium!
              </Text>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
