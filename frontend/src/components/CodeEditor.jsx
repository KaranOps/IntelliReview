import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, language, onChange }) => {
    return (
        <div className="h-full w-full border-r border-gray-300">
            <Editor
                height="100%"
                defaultLanguage="javascript"
                language={language}
                defaultValue="// Paste your code here..."
                value={code}
                onChange={onChange}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
