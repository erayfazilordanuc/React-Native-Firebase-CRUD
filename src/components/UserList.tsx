import React from 'react';
import styles from '../styles';
import {Text, View, FlatList, Alert} from 'react-native';
import {FirestoreService} from '../firebase/service';
import {Button} from './Button';
import {Title} from './Title';

export const UserList: React.FC<UserListProps> = ({users, refreshUsers, onEdit}) => {
  const deleteUser = (id: number, refreshUsers: () => void) => {
    Alert.alert('Are you sure to delete?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const deleteResult = await FirestoreService.deleteUser(id);
            if (deleteResult) { // await işe yaramadığından timeout eklendi
              setTimeout(() => {
                refreshUsers();
              }, 250);
            }
          } catch (error) {
            console.log('Error deleting data: ', error);
          }
        },
      },
    ]);
  };

  return (
    <>
      <Title style={{marginVertical: 15}}>Users</Title>
      <View style={styles.contentContainer}>
        <FlatList
          data={users}
          keyExtractor={item => item.username}
          contentContainerStyle={styles.dataList}
          renderItem={({item}: {item: User}) => (
            <View
              style={{
                ...styles.row,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.item}>
                {item.id} / {item.username} / {item.mail}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Button
                  title={'Edit'}
                  onPress={() => {onEdit(String(item.id))}}
                  style={{
                    backgroundColor: '#cdf322',
                    marginRight: 10,
                  }}
                />
                <Button
                  title={'Delete'}
                  onPress={() => {
                    deleteUser(item.id, refreshUsers);
                  }}
                  style={{
                    color: 'white',
                    backgroundColor: '#ff4040',
                  }}
                />
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};
