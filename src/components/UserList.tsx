import React, {useEffect, useState} from 'react';
import styles from '../styles';
import {Text, View, FlatList, Alert, ActivityIndicator} from 'react-native';
import {FirestoreService} from '../firebase/service';
import {Button} from './Button';
import {Title} from './Title';

export const UserList: React.FC<UserListProps> = ({
  isEnabled,
  onEdit,
  refresh,
  refreshCallback,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
    refreshCallback();
  }, [isEnabled, refresh]);

  const getUsers = async () => {
    await FirestoreService.getUsers(
      (usersList: User[]) => {
        setUsers(usersList);
        setIsLoading(false);
      },
      (/* error: any */) => {
        setIsLoading(false);
      },
    );
  };

  const deleteUser = (id: number) => {
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
            if (deleteResult) {
              // await işe yaramadığından timeout eklendi
              setTimeout(() => {
                getUsers();
              }, 100);
            }
          } catch (error) {
            console.log('Error deleting data: ', error);
          }
        },
      },
    ]);
  };
  return (
    isEnabled &&
    (!isLoading ? (
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
                  marginVertical: 5,
                }}>
                <View style={{flex: 1, flexWrap: 'wrap'}}>
                  <Text style={styles.item} numberOfLines={1}>
                    {item.id}
                  </Text>
                  <Text style={styles.item} numberOfLines={1}>
                    {item.username}
                  </Text>
                  <Text style={styles.item} numberOfLines={1}>
                    {item.mail}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Button
                    title={'Edit'}
                    onPress={() => {
                      onEdit(String(item.id), item.username, item.mail);
                    }}
                    style={{
                      backgroundColor: '#cdf322',
                      marginRight: 10,
                    }}
                  />
                  <Button
                    title={'Delete'}
                    onPress={() => {
                      deleteUser(item.id);
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
    ) : (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    ))
  );
};
