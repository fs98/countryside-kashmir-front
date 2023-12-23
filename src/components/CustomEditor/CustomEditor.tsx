import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import EditorJS from '@editorjs/editorjs';

// Define a type for the props
type CustomEditorProps = {
  // eslint-disable-next-line no-unused-vars
  onChange: (data: any) => void;
  initialData?: any;
};

export const CustomEditor = forwardRef(({ onChange, initialData }: CustomEditorProps, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getValue: async () => {
      const data = await editorRef.current.save();
      onChange(data); // Notify React Hook Form of the change
      return data;
    },
  }));

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editor-js',
        placeholder: 'Write here..!',
        onChange: async () => {
          const data = await editor.save();
          onChange(data); // Update React Hook Form
        },
        data: initialData,
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [initialData, onChange]);

  return <div className="p-3" id="editor-js" />;
});

CustomEditor.displayName = 'CustomEditor';
