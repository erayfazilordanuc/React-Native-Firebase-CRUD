import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ActivityIndicator} from 'react-native';
import {FirestoreService} from './firebase/service';
import styles from './styles';
import {UserList} from './components/UserList';
import {CreateUserCard} from './components/CreateUserCard';
import {Button} from './components/Button';
import {GradientTitle} from './components/GradientTitle';

function App(): React.JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserListEnabled, setIsUserListEnabled] = useState(false);
  const [isUserCreating, setIsUserCreating] = useState(false);
  const [userId, setUserId] = useState('');

  // TO DO isRefresh: boolean = false yapmama rağmen yine de illaki false diye belirtmem gerekti, neden
  const handleGettingUsers = async (isRefresh: boolean) => {
    if (!isUserListEnabled || isRefresh) {
      setIsLoading(true);
      setIsUserListEnabled(true);

      await FirestoreService.getUsers(
        (usersList: User[]) => {
          setUsers(usersList);
          setIsLoading(false);
        },
        (/* error: any */) => {
          setIsLoading(false);
        },
      );
    } else {
      setIsUserListEnabled(false);
    }
  };

  const handleUserCreation = () => {
    if (!isUserCreating) {
      setIsUserCreating(true);
      setUserId('');
    } else {
      setIsUserCreating(false);
    }
  };

  const handleEditUser = (id: string) => {
    if (!isUserCreating) {
      setIsUserCreating(true);
      setUserId(id);
    } else {
      setIsUserCreating(false);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsUserCreating(true);
        setUserId(id);
      }, 0);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientTitle style={{color: 'white'}}>
        React Native Firebase CRUD
      </GradientTitle>
      <View style={styles.row}>
        <Button
          title={!isUserListEnabled ? 'Show Users' : 'Close User List'}
          onPress={() => handleGettingUsers(false)}
          style={
            !isUserListEnabled
              ? {color: 'white', backgroundColor: '#2eb0ff'}
              : {color: 'white', backgroundColor: '#2a93fc'}
          }
        />
        <Button
          title={'Create-Update User'}
          onPress={handleUserCreation}
          style={
            !isUserCreating
              ? {color: 'white', backgroundColor: '#ff9d2e'}
              : {color: 'white', backgroundColor: '#ff6d2e'}
          }
        />
      </View>
      {isUserCreating && (
        <CreateUserCard
          userId={userId}
          onLoadingChange={() => setIsLoading}
          refreshUsers={() => handleGettingUsers(true)}
          setIsUserCreating={() => setIsUserCreating(false)}
        />
      )}
      {isUserListEnabled && !isLoading && (
        <UserList
          users={users}
          refreshUsers={() => handleGettingUsers(true)}
          onEdit={id => handleEditUser(id)}
        />
      )}
      {isLoading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={'black'} />
        </View>
      )}
    </SafeAreaView>
  );
}

export default App;
