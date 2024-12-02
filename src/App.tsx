import GjsEditor from '@grapesjs/react';
import grapesjs from 'grapesjs';
import { useEffect } from 'react';

import { useEditor, useUser } from './hooks';
import { userToBlock } from './mappers';

function App() {
  const { editor, onEditor, addBlock } = useEditor();
  const { users } = useUser();

  useEffect(() => {
    if (!editor) {
      return;
    }

    users.forEach((user) => {
      addBlock(String(user.id), userToBlock(user));
    });
  }, [editor, users]);

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
      onEditor={onEditor}
    />
  );
}

export default App;
