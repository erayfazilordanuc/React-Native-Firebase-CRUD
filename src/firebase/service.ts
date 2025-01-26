import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import {db} from './config';

export const FirestoreService = {
  getUsers: async (
    onUsersLoaded: (users: User[]) => void,
    onError: (error: any) => void,
  ) => {
    try {
      const usersQuery = collection(db, 'users');
      const snapshot = await getDocs(usersQuery);
      const usersList = snapshot.docs
        .map(doc => {
          const data = doc.data() as User;
          return {...data, id: Number(doc.id)};
        })
        .sort((a, b) => a.id - b.id);

      onUsersLoaded(usersList);
    } catch (error) {
      console.error('Error fetching data: ', error);
      onError(error);
      return () => {};
    }
  },
  createUser: async (
    id: number,
    username: string,
    mail: string,
    onError: (error: any) => void,
  ) => {
    try {
      await setDoc(doc(db, 'users', String(id)), {
        username: username,
        mail: mail,
      });
    } catch (error) {
      console.error('Error creating data: ', error);
      onError(error);
    }
  },
  updateUser: async (
    id: number,
    username: string,
    mail: string,
    onError: (error: any) => void,
  ) => {
    try {
      await setDoc(doc(db, 'users', String(id)), {
        username: username,
        mail: mail,
      });
    } catch (error) {
      console.error('Error updating data: ', error);
      onError(error);
    }
  },
  deleteUser: async (id: number) => {
    try {
      deleteDoc(doc(db, 'users', String(id)));
      return true;
    } catch (error) {
      console.error('Error fetching data: ', error);
      return false;
    }
  },
  subscribeToUsers: (
    onUsersLoaded: (users: User[]) => void,
    onError: (error: any) => void,
  ) => {
    try {
      const usersQuery = collection(db, 'users');
      const unsubscribe = onSnapshot(usersQuery, snapshot => {
        const usersList = snapshot.docs
          .map(doc => {
            const data = doc.data() as User;
            return {...data, id: Number(data.id)};
          })
          .sort((a, b) => a.id - b.id);

        onUsersLoaded(usersList);
      });

      return unsubscribe;
    } catch (error) {
      onError(error);
      return () => {};
    }

    // Subscribtion usage
    //
    //  useEffect(() => {
    //     setLoading(true);

    //     // await eklenebilir mi
    //     const unsubscribe = FirestoreService.subscribeToUsers(
    //       (usersList: User[]) => {
    //         setUsers(usersList);
    //         setLoading(false);
    //       },
    //       (error: any) => {
    //         console.error('Error fetching data:', error);
    //         setLoading(false);
    //       }
    //     );

    //   }, []);
  },
};
