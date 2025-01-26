import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ActivityIndicator} from 'react-native';
import styles from './styles';
import {UserList} from './components/UserList';
import {CreateUserCard} from './components/CreateUserCard';
import {Button} from './components/Button';
import {GradientTitle} from './components/GradientTitle';
import {EditUserCard} from './components/EditUserCard';

function App(): React.JSX.Element {
  const [isUserListEnabled, setIsUserListEnabled] = useState(false);
  const [isUserCreating, setIsUserCreating] = useState(false);
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [refresh, setRefresh] = useState(false);

  // TO DO isRefresh: boolean = false yapmama rağmen yine de illaki false diye belirtmem gerekti, neden
  const handleGettingUsers = async () => {
    if (!isUserListEnabled) {
      setIsUserListEnabled(true);
    } else {
      setIsUserListEnabled(false);
    }
  };

  const handleUserCreation = () => {
    if (!isUserCreating) {
      setIsUserCreating(true);
    }
  };

  const handleEditUser = (id: string, username: string, mail: string) => {
    if (!isUserEditing) {
      setIsUserEditing(true);
      setUserId(id);
      setUsername(username);
      setMail(mail);
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
          onPress={handleGettingUsers}
          style={
            !isUserListEnabled
              ? {color: 'white', backgroundColor: '#2eb0ff'}
              : {color: 'white', backgroundColor: '#2a93fc'}
          }
        />
        <Button
          title={'Create User'}
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
          refreshUsers={() => setRefresh(true)}
          setIsUserCreating={() => setIsUserCreating(false)}
        />
      )}
      {isUserEditing && (
        <EditUserCard
          id={userId}
          username={username}
          mail={mail}
          refreshUsers={() => setRefresh(true)}
          setIsUserEditing={() => setIsUserEditing(false)}
        />
      )}
      <UserList
        isEnabled={isUserListEnabled}
        onEdit={(id: string, username: string, mail: string) =>
          handleEditUser(id, username, mail)
        }
        refresh={refresh}
        refreshCallback={() => setRefresh(false)}
      />
    </SafeAreaView>
  );
}

export default App;
