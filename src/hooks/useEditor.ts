import { BlockProperties, type Editor } from 'grapesjs';
import { useEffect, useState } from 'react';

export const useEditor = () => {
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    if (!editor) {
      return;
    }
  }, [editor]);

  const onEditor = (editor: Editor) => {
    setEditor(editor);
  };

  const addBlock = (id: string, block: BlockProperties) => {
    if (!editor) {
      return;
    }

    editor.BlockManager.add(id, block);
  };

  const addBlocks = (blocks: Array<{ id: string; block: BlockProperties }>) => {
    if (!editor) {
      return;
    }

    blocks.forEach(({ id, block }) => addBlock(id, block));
  };

  return {
    editor,
    onEditor,
    addBlock,
    addBlocks,
  };
};
