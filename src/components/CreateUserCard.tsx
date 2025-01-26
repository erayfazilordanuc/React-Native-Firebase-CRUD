import React, {useState} from 'react';
import {Text, TextInput, View, Dimensions, Alert} from 'react-native';
import styles from '../styles';
import {Title} from './Title';
import {Button} from './Button';
import {FirestoreService} from '../firebase/service';

//TO DO son idye bakmak için kullanıcıları getirebilir ve ona göre yeni kullanıcı idsini belirler

export const CreateUserCard: React.FC<CreateUserProps> = ({
  userId,
  onLoadingChange,
  refreshUsers,
  setIsUserCreating,
}) => {
  const {height, width} = Dimensions.get('window');
  const [id, setId] = useState(userId ? userId : '');
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');

  const createUser = async (
    setIsLoading: (state: boolean) => void,
    refreshUsers: () => void,
    setIsUserCreating: () => void,
  ) => {
    setIsLoading(true);
    // aynı isimli kullanıcıdan varsa kullanıcı zaten var hatası falan fırlatılabilir
    if (username === '' || mail === '') {
      Alert.alert('Please fill in all the blanks!');
      return;
    } else {
      // mail için pattern oluşturulabilir
      await FirestoreService.createUser(
        parseInt(id),
        username,
        mail,
        (/* error: any */) => {
          setIsLoading(false);
        },
      );

      refreshUsers();
      setIsUserCreating();
    }
  };

  const isNumeric = (value: string) => {
    return /^[0-9]*$/.test(value);
  };

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#c2c2c2',
        borderRadius: 15,
        marginTop: 15,
        height: height * 0.45,
      }}>
      <Title
        style={{
          marginVertical: 10,
        }}>
        User Creation
      </Title>
      <Text style={styles.item}>Id</Text>
      <TextInput
        style={{
          borderRadius: 10,
          height: 40,
          margin: 7,
          borderWidth: 1,
          fontSize: 15,
          width: '50%',
        }}
        keyboardType="numeric"
        onChangeText={value => {
          if (isNumeric(value)) {
            setId(value);
          }
        }}
        value={id}
      />
      <Text style={styles.item}>Username</Text>
      <TextInput
        style={{
          borderRadius: 10,
          height: 40,
          margin: 7,
          borderWidth: 1,
          fontSize: 15,
          width: '50%',
        }}
        onChangeText={setUsername}
        value={username}
      />
      <Text style={styles.item}>Mail</Text>
      <TextInput
        style={{
          borderRadius: 10,
          height: 40,
          margin: 7,
          borderWidth: 1,
          fontSize: 15,
          width: '50%',
        }}
        onChangeText={setMail}
        value={mail}
      />
      <Button
        style={{backgroundColor: '#22f391'}}
        title={'Apply'}
        onPress={() => {
          createUser(onLoadingChange, refreshUsers, setIsUserCreating);
        }}></Button>
      <Button
        style={{backgroundColor: '#ff4040'}}
        title={'Cancel'}
        onPress={() => {
          if (id === '' && username === '' && mail === '') {
            setIsUserCreating();
          } else {
            Alert.alert('Are you sure to cancel?', '', [
              {
                text: 'No',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: setIsUserCreating,
              },
            ]);
          }
        }}></Button>
    </View>
  );
};
