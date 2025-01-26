import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles';
import {Title} from './Title';
import {Button} from './Button';
import {FirestoreService} from '../firebase/service';

//TO DO son idye bakmak için kullanıcıları getirebilir ve ona göre yeni kullanıcı idsini belirler

export const EditUserCard: React.FC<EditUserProps> = ({
  id,
  username,
  mail,
  refreshUsers,
  setIsUserEditing,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {height, width} = Dimensions.get('window');
  const [localId, setLocalId] = useState(id);
  const [localUsername, setLocalUsername] = useState(username);
  const [localMail, setLocalMail] = useState(mail);

  const updateUser = async (
    refreshUsers: () => void,
    setIsUserEditing: () => void,
  ) => {
    setIsLoading(true);
    if (username === '' || mail === '') {
      Alert.alert('Please fill in all the blanks!');
      return;
    } else {
      // mail için pattern oluşturulabilir
      await FirestoreService.updateUser(
        parseInt(localId),
        localUsername,
        localMail,
        (/* error: any */) => {
          setIsLoading(false);
        },
      );

      refreshUsers();
      setIsUserEditing();
    }
  };

  const handleCancel = () => {
    if (id === '' && username === '' && mail === '') {
      setIsUserEditing();
    } else {
      Alert.alert('Are you sure to cancel?', '', [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: setIsUserEditing,
        },
      ]);
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
      {!isLoading ? (
        <>
          <Title
            style={{
              marginVertical: 10,
            }}>
            User Edition (!)
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
                setLocalId(value);
              }
            }}
            value={localId}
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
            onChangeText={value => {
              setLocalUsername(value);
            }}
            value={localUsername}
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
            onChangeText={value => {
              setLocalMail(value);
            }}
            value={localMail}
          />
          <Button
            style={{backgroundColor: '#22f391'}}
            title={'Apply'}
            onPress={() => {
              updateUser(refreshUsers, setIsUserEditing);
            }}></Button>
          <Button
            style={{backgroundColor: '#ff4040'}}
            title={'Cancel'}
            onPress={handleCancel}></Button>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={'black'} />
        </View>
      )}
    </View>
  );
};
