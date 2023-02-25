import AsyncStorage from "@react-native-async-storage/async-storage";


export const getToken = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null;
    return token;
  } catch (error) {
    console.log(error);
  }
};
