import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../bottom-nav-bar/SearchBar';

const ICONS = [
  { name: 'ios-restaurant', label: 'Restaurants' },
  { name: 'ios-cart', label: 'Grocery' },
  { name: 'ios-alarm', label: 'Convenience' },
  { name: 'ios-medical', label: 'Medicine' },
  { name: 'ios-pizza', label: 'Pizza'},
  { name: 'ios-ice-cream', label: 'Dessert'},
  // Add more icons here
];

const HomeScreen = () => {

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.iconContainer}>
      <View style={styles.imageContainer}>
        <Ionicons name={item.name} size={24} color="#ff82b2" />
      </View>
      <Text style={styles.iconLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Find Halal</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      <View style={styles.iconsContainer}>
        <FlatList
          data={ICONS}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.iconsList}
        />
      </View>
      <View style={styles.line} />
      <View style={styles.contentContainer}>
        <Text>Home Screen</Text>
        <Button
          title= "Click Here"
          onPress={() => alert('Button Clicked')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbd1ed',
  },
  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 50,
    marginLeft: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  searchBarContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  iconsList: {
    paddingHorizontal: 0,
    marginRight: 12,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d3c5fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    width: '100%',
  },
  iconLabel: {
    marginTop: 5,
    color: 'black',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;