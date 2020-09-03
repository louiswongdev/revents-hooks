import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { signOutUser } from '../auth/authActions';

function SignedInMenu() {
  // const { currentUser } = useSelector(state => state.auth);
  const { currentUserProfile } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleSignOut() {
    try {
      dispatch(signOutUser());
      history.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUserProfile.photoURL || '/assets/user.png'}
      />
      <Dropdown pointing="top left" text={currentUserProfile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item
            as={Link}
            to={`/profile/${currentUserProfile.id}`}
            text="My profile"
            icon="user"
          />
          <Dropdown.Item
            as={Link}
            to="/account"
            text="My account"
            icon="settings"
          />
          <Dropdown.Item onClick={handleSignOut} text="Sign out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
