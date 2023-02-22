import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, {useEffect, useState} from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import client from '../sanity';

const FeaturedRow = ({id, title, description}) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    client.fetch(`
    *[_type=="featured" && _id==$id] 
  {
    ...,
    restaurants[] -> {
      ...,
      dishes[] -> {...},
      category -> {_id, name}
    }
  } [0]
  `, { id }).then((data) => {
      setRestaurants(data?.restaurants);
    });
  }, []);

  return (
    <View>
    <View className="flex-row flex-1 mt-4 px-4 items-center justify-between">
      <Text className="font-bold text-lg">{title}</Text>
      <ArrowRightIcon color="#00CCB8"/>
    </View>
      <Text className="text-xs px-4 text-gray-500">{description}</Text>

      <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 15}} showsHorizontalScrollIndicator={false} className="pt-4">
        {/* Restaurant Cards */}
        { 
          restaurants?.map(restaurant => (
            <RestaurantCard 
              id={restaurant._id}
              key={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.category?.name}
              address={restaurant.address}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
            ></RestaurantCard>
            
          ))
        }        
      </ScrollView>
    </View>
  )
}

export default FeaturedRow