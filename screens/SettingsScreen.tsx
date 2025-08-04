import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../contexts/AppContext';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

const SettingsScreen = () => {
  const {
    unit,
    setUnit,
    selectedCategories,
    setSelectedCategories,
  } = useAppContext();

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.heading}>Settings</Text>

        {/* Temperature Unit Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temperature Unit</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[
                styles.unitButton,
                unit === 'metric' && styles.activeButton,
              ]}
              onPress={() => setUnit('metric')}
            >
              <Text
                style={[
                  styles.unitButtonText,
                  unit === 'metric' && styles.activeText,
                ]}
              >
                Celsius (°C)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.unitButton,
                unit === 'imperial' && styles.activeButton,
              ]}
              onPress={() => setUnit('imperial')}
            >
              <Text
                style={[
                  styles.unitButtonText,
                  unit === 'imperial' && styles.activeText,
                ]}
              >
                Fahrenheit (°F)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* News Category Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred News Categories</Text>
          <View style={styles.categoryGrid}>
            {categories.map(category => {
              const isSelected = selectedCategories.includes(category);
              return (
                <TouchableOpacity
                  key={category}
                  onPress={() => toggleCategory(category)}
                  style={[
                    styles.categoryButton,
                    isSelected && styles.activeCategory,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && styles.activeCategoryText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  inner: {
    padding: responsiveWidth(5),
    paddingBottom: responsiveHeight(5),
  },
  heading: {
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  unitButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  unitButtonText: {
    fontSize: responsiveFontSize(2),
    color: '#555',
  },
  activeButton: {
    backgroundColor: '#007AFF20',
    borderColor: '#007AFF',
  },
  activeText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#EEE',
  },
  categoryText: {
    fontSize: responsiveFontSize(1.9),
    color: '#333',
  },
  activeCategory: {
    backgroundColor: '#007AFF20',
  },
  activeCategoryText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
