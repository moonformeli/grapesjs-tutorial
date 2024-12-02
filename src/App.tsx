import GjsEditor from '@grapesjs/react';
import axios from 'axios';
import grapesjs, { Editor } from 'grapesjs';
import './App.css';
import { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { type User } from './types';
import UserBlock from './components/UserBlock';

const H1 = ({ children }: PropsWithChildren) => <h1>{children}</h1>;

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (editor) {
      // Add blocks
      editor.BlockManager.add('text-block', {
        label: 'Text Block',
        content: ReactDOMServer.renderToStaticMarkup(<H1>Hello world</H1>),
        category: 'Block',
      });
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    users.forEach((user) => {
      editor.BlockManager.add(`user-block-${user.id}`, {
        label: `${user.first_name} ${user.last_name}`,
        content: ReactDOMServer.renderToStaticMarkup(<UserBlock user={user} />),
        category: 'Users',
      });
    });
  }, [editor, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users?page=1');

      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <GjsEditor
      // Pass the core GrapesJS library to the wrapper (required).
      // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
      grapesjs={grapesjs}
      // Load the GrapesJS CSS file asynchronously from URL.
      // This is an optional prop, you can always import the CSS directly in your JS if you wish.
      grapesjsCss='https://unpkg.com/grapesjs/dist/css/grapes.min.css'
      // GrapesJS init options
      options={{
        width: '100vw',
        height: '100vh',
        storageManager: false,
        // blockManager: {},
      }}
      onEditor={setEditor}
    />
  );
}

export default App;
