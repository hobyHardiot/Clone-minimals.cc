// hooks
// import useAuth from '../hooks/useAuth';
// utils
// import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  // const { user } = useAuth();

  return (
    <Avatar
      // src={user?.photoURL}
      // alt={user?.displayName}
      // color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      color='default'
      {...other}
    >
      {/* {createAvatar(user?.displayName).name} */}
      A
    </Avatar>
  );
}
