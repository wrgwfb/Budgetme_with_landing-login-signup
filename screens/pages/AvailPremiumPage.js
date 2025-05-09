import React from 'react';
import { View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AvailpreIcon from "../../assets/AvailPremiumIcons/AvailPreIcon.png";
import Coincheck from "../../assets/AvailPremiumIcons/CoinCheck.png";
import dollarSign from "../../assets/AvailPremiumIcons/dollarSign.png";
import WalletIcon from "../../assets/AvailPremiumIcons/wallet.png";
import CoinBag from "../../assets/AvailPremiumIcons/CoinBag.png";
import PiechartIcon from "../../assets/AvailPremiumIcons/PiechartIcon.png";
import CalendarIcon from "../../assets/AvailPremiumIcons/CalendarIcon.png";

const AvailPremiumPage = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}  onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.titlePre}>Premium Access</Text>
        <Text style={styles.price}>PHP ₱58.00 / month</Text>
        <Text style={styles.description}>
          Join over 2,000 members and get access to the best 
          all-in-one financial membership.{"\n"}Join now!!
        </Text>
         <Image
                      source={AvailpreIcon}
                      style={{ width: 250, height: 150 }}
                      resizeMode="contain"
                      className="ml-4 absolute bottom-0 right-0 top-[100px]"
                    />
      </View>

      <View style={styles.featuresCard}>
      <FeatureItem icon="dollar-image" label="Budgeting" unlimited />
      <FeatureItem icon="wallet-image" label="Wallet" unlimited />
      <FeatureItem icon="coinbag-image" label="Savings Guides" pro />
      <FeatureItem icon="piechart-image" label="Real time analytics" pro />
      <FeatureItem icon="calendar-image" label="Track records all months" pro />
      </View>

      <TouchableOpacity style={styles.buttonPre}>
        <Text style={styles.buttonTextPre}>Avail premium access</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const FeatureItem = ({ icon, label, unlimited, pro }) => {
  let iconElement;

  switch (icon) {
    case 'dollar-image':
      iconElement = <Image source={dollarSign} style={styles.coinIcon} />;
      break;
    case 'wallet-image':
      iconElement = <Image source={WalletIcon} style={styles.coinIcon} />;
      break;
    case 'coinbag-image':
      iconElement = <Image source={CoinBag} style={styles.coinIcon} />;
      break;
    case 'piechart-image':
      iconElement = <Image source={PiechartIcon} style={styles.coinIcon} />;
      break;
    case 'calendar-image':
      iconElement = <Image source={CalendarIcon} style={styles.coinIcon} />;
      break;
    default:
      iconElement = <MaterialIcons name={icon} size={24} color="#333" />;
  }

  return (
    <View style={styles.featureItem}>
      {iconElement}
      <Text style={styles.featureText}>{label}</Text>
      <Text style={styles.featureRight}>
        {unlimited ? (
          <Text style={styles.featureRight}>Unlimited</Text>
        ) : pro ? (
          <Image source={Coincheck} style={styles.coinIcon} />
        ) : null}
      </Text>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#054396',
    padding: 20,
    minHeight: 470,
    minWidth: 360,
    position: 'absolute',
  },
  closeButton: {
    alignSelf: 'flex-start',
    top: 35,
    backgroundColor: '#CACACA4A',
    padding: 10,
    borderRadius: 100,
  },
  titlePre: {
    fontSize: 22,
    color: '#fff',
    marginTop: 80,
    width: 100,
  },
  price: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  description: {
    color: '#fff',
    backgroundColor: '#084EAC',
    top: 70,
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
  },
  featuresCard: {
    margin: 15,
    padding: 10,
    top: 370,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  featureText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  featureRight: {
    fontSize: 14,
    color: '#666',
  },
  buttonPre: {
    backgroundColor: '#054396',
    marginHorizontal: 15,
    marginBottom: 30,
    padding: 13,
    top: 375,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonTextPre: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  coinIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default AvailPremiumPage;
