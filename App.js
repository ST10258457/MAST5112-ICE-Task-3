import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  Button,
  StyleSheet
} from 'react-native';

function CounterScreen({ navigation }) {
  const [count, setCount] = useState(0);

  const increment = async () => {
    let tempCount = count + 1;

    setCount(tempCount);
    await AsyncStorage.setItem('counter', tempCount.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Counter</Text>
      <Button 
        title="Increment"
        onPress={() => increment()}
        style={styles.button}
      />
      <Text style={styles.text}>Clicked {count} times</Text>
      <Button 
        title="Navigate to next screen"
        onPress={() => navigation.navigate('DisplayCounterScreen')}
        style={styles.button}
      />
    </View>
  );
}

function DisplayCounterScreen() {
  const [count, setCount] = useState(0);

  const getStoredCount = async () => {
    const storedCount = await AsyncStorage.getItem('counter') ?? 0;
    setCount(storedCount);
  };

  useEffect(() => {
    getStoredCount();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stored value is {count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  text: {
    marginVertical: 60,
    fontSize: 35,
  },
  button: {
    marginVertical: 20,
  },
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CounterScreen" component={CounterScreen} />
        <Stack.Screen name="DisplayCounterScreen" component={DisplayCounterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;