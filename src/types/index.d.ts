type User = {
  id: number;
  username: string;
  mail: string;
};

type UserListProps = {
  users: User[];
  refreshUsers: () => void;
  onEdit: (id: string) => void;
};

type CreateUserProps = {
  userId?: string;
  onLoadingChange: (state: boolean) => void;
  refreshUsers: () => void;
  setIsUserCreating: ()=> void;
};

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle | TextStyle;
};

type TitleProps = {
  children: React.ReactNode;
  style?: ViewStyle | TextStyle;
};
