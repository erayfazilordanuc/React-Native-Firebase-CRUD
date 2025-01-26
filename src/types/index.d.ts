type User = {
  id: number;
  username: string;
  mail: string;
};

type UserListProps = {
  isEnabled: boolean;
  onEdit: (id: string, username: string, mail: string) => void;
  refresh: boolean;
  refreshCallback: () => void;
};

type CreateUserProps = {
  refreshUsers: () => void;
  setIsUserCreating: () => void;
};

type EditUserProps = {
  id: string;
  username: string;
  mail: string;
  refreshUsers: () => void;
  setIsUserEditing: () => void;
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
