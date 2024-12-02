import { type BlockProperties } from 'grapesjs';
import ReactDOMServer from 'react-dom/server';
import UserBlock from '../components/UserBlock';
import { type User } from '../types';

export const userToBlock = (user: User) => {
  return {
    label: `${user.first_name} ${user.last_name}`,
    category: 'Users',
    content: ReactDOMServer.renderToStaticMarkup(<UserBlock user={user} />),
  } as BlockProperties;
};
