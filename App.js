import * as React from "react";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
  Alert,
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import "react-native-gesture-handler";
import SignupPage from "./screens/pages/SignupPage";
import LoginPage from "./screens/pages/LoginPage";
import LandingPage from "./screens/pages/LandingPage";
import Home from "./screens/pages/Home";
import Budget from "./screens/pages/Budget";
import Wallet from "./screens/pages/Wallet";
import Guides from "./screens/pages/Guides";
import Categories from "./screens/pages/Categories";
import AddExpense from "./screens/pages/AddExpense";
import AddIncome from "./screens/pages/AddIncome";
import AddTransfer from "./screens/pages/AddTransfer";
import Records from "./screens/pages/Records";
import AvailPremiumPage from "./screens/pages/AvailPremiumPage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// FloatingButton component
const FloatingButton = ({ navigation }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const animation = React.useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const addExpenseStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -50],
        }),
      },
    ],
  };

  const addIncomeStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100],
        }),
      },
    ],
  };

  const addTransferStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -150],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {isOpen && (
        <>
          <Animated.View style={[styles.secondaryButton, addTransferStyle]}>
            <View className="items-center w-[38px] h-[38px] justify-center bg-[#12224F] rounded-full ml-8">
              <TouchableOpacity
                onPress={() => {
                  console.log("Navigating to AddTransfer");
                  navigation.navigate("AddTransfer");
                }}
              >
                <Icon name="repeat" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Text className="absolute right-[75px] font-bold bg-white/80 p-2 rounded-full">
              Add Transfer
            </Text>
          </Animated.View>

          <Animated.View style={[styles.secondaryButton, addIncomeStyle]}>
            <View className="items-center w-[38px] h-[38px] justify-center bg-[#12224F] rounded-full ml-8">
              <TouchableOpacity
                onPress={() => {
                  console.log("Navigating to AddIncome");
                  navigation.navigate("AddIncome");
                }}
              >
                <Icon name="arrow-down-circle" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Text className="absolute right-[75px] font-bold bg-white/80 p-2 rounded-full">
              Add Income
            </Text>
          </Animated.View>

          <Animated.View style={[styles.secondaryButton, addExpenseStyle]}>
            <View className="items-center w-[38px] h-[38px] justify-center bg-[#12224F] rounded-full ml-8">
              <TouchableOpacity
                onPress={() => {
                  console.log("Navigating to AddExpense");
                  navigation.navigate("AddExpense");
                }}
              >
                <Icon name="plus-circle" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Text className="absolute right-[75px] font-bold bg-white/80 p-2 rounded-full">
              Add Expense
            </Text>
          </Animated.View>
        </>
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleMenu}>
        <Icon name={isOpen ? "x" : "plus"} size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

// Tab Navigator Component
const TabNavigator = ({ navigation }) => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarIcon: ({ focused }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Wallet":
                iconName = "credit-card";
                break;
              case "Budget":
                iconName = "pie-chart";
                break;
              case "Guides":
                iconName = "book";
                break;
              case "Category":
                iconName = "plus-square";
                break;
              default:
                iconName = "circle";
            }
            return (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.activeIconContainer,
                ]}
              >
                <Icon
                  name={iconName}
                  size={24}
                  color={focused ? "#12224F" : "#9D9D9D"}
                />
                <Text
                  style={[
                    styles.label,
                    {
                      color: focused ? "#12224F" : "#9D9D9D",
                      fontFamily: focused
                        ? "Poppins_700Bold"
                        : "Poppins_400Regular",
                      fontSize: 12,
                    },
                  ]}
                >
                  {route.name}
                </Text>
              </View>
            );
          },
          tabBarLabel: () => null,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Wallet" component={Wallet} />
        <Tab.Screen name="Budget" component={Budget} />
        <Tab.Screen name="Guides" component={Guides} />
        <Tab.Screen name="Category" component={Categories} />
      </Tab.Navigator>
      <FloatingButton navigation={navigation} />
    </>
  );
};

// Drawer Navigator Component
const DrawerNavigator = ({ navigation }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      screenOptions={({ route }) => ({
        drawerStyle: {
          backgroundColor: "#FFFFFF",
          width: 250,
        },
        drawerLabelStyle: {
          fontFamily: "Poppins_500Medium",
          fontSize: 16,
          color: "#12224F",
        },
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerTintColor: "#12224F",
        headerTitleStyle: {
          fontFamily: "Poppins_700Bold",
        },
        drawerIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case "Tabs":
              iconName = "home";
              break;
            case "Wallet":
              iconName = "credit-card";
              break;
            case "Budget":
              iconName = "pie-chart";
              break;
            case "Guides":
              iconName = "book";
              break;
            case "Categories":
              iconName = "plus-square";
              break;
            case "Records":
              iconName = "list";
              break;
            default:
              iconName = "circle";
          }
          return (
            <Icon
              name={iconName}
              size={20}
              color={focused ? "#12224F" : "#9D9D9D"}
            />
          );
        },
      })}
    >
      <Drawer.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ drawerLabel: "Home", title: "My App", headerShown: false }}
      />
      <Drawer.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Budget"
        component={Budget}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Guides"
        component={Guides}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Categories"
        component={Categories}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Records"
        component={Records}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  // Handle Android back button
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Exit App",
        "Are you sure you want to exit?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: true }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
  name="LoginPage"
  component={LoginPage}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="SignupPage"
  component={SignupPage}
  options={{ headerShown: false }}
/>
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpense}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddIncome"
          component={AddIncome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddTransfer"
          component={AddTransfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AvailPremiumPage" component={AvailPremiumPage} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    height: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  iconContainer: {
    width: 50,
    height: 50,
    marginTop: 40,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIconContainer: {
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 9,
    marginTop: 8,
  },
  container: {
    position: "absolute",
    bottom: 100,
    right: 30,
    alignItems: "center",
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#12224F",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#12224F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
  secondaryButton: {
    position: "absolute",
    width: 100,
    height: 38,
    borderRadius: 24,
  },
});
