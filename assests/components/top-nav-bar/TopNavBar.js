import MaterialCommunityIcons from '@expo/vector-icons';

const TopNavBar = () => {
    return (
      <View style={styles.topNavBar}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="address-card-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  