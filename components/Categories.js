import { View, Text, ScrollView } from 'react-native';
import React, { useState,  useEffect } from 'react';
import CategoryCard from './CategoryCard';
import client from '../sanity';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "category"]`).then(data => {
      setCategories(data);
    })
  }, [])

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} 
      contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
      }}>
      {/* Category Card */}
      {categories?.map(category => (
        <CategoryCard id={category._id} key={category._id} imageUrl={category.image} title={category.name}></CategoryCard>      
      ))}
    </ScrollView>
  )
}

export default Categories