import {
  StatusBar,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [ featuredCategories, setFeaturedCategories ] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client.fetch('*[_type == "featured"] {..., restaurants[]->{..., dishes[]->{...}}}').then((data) => {
      setFeaturedCategories(data);      
    });
  }, []);

  return (
    <SafeAreaView style={styles.container} className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-4">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        ></Image>
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCB8"></ChevronDownIcon>
          </Text>
        </View>
        <UserIcon size={35} color="#00CCB8"></UserIcon>
      </View>

      {/* Search bar */}
      <View className="flex-row space-x-2 pb-2 mx-4 items-center">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          ></TextInput>
        </View>
        <AdjustmentsVerticalIcon color="#00CCB8" />
      </View>

      {/* Body */}
      <ScrollView>
        {/* Categories */}
        <Categories></Categories>

        {/* Feature Row */}
        {
          featuredCategories?.map(featured => (
            <FeaturedRow key={featured._id} id={featured._id} title={featured.name} description={featured.short_description}></FeaturedRow>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
