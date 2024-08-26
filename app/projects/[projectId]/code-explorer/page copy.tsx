'use client';
import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import TreeView from './TreeView';  // Adjust the import path as necessary
import { files } from './types';  // Adjust the import path as necessary
import InputBar from '@/components/InputBar';
import PageContainer from '@/components/layout/page-container';
import { useRowData } from '@/context/rowDataContext';
import { Sparkle } from 'lucide-react';  // Import the Sparkle icon

interface FileContents {
  [key: string]: string;
}

const CodeExplorer: React.FC = () => {
  const [code, setCode] = useState<string>('// Select a file to view its content');
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('light');
  const [currentFile, setCurrentFile] = useState<string>('index.html');
  const [language, setLanguage] = useState<string>('html');
  const { rowData, setRowData } = useRowData();

  console.log(rowData);

  // Safely extract base URL from fileUrl
  const baseFileUrl = rowData?.fileUrl?.replace('.zip', '/') ?? '';

  const handleFileClick = (fileName: string) => {
    console.log('Base File URL:', baseFileUrl);
    console.log('File Name:', fileName);
    const fullPath = `${baseFileUrl}${fileName}`;
    console.log('Full Path:', fullPath);
  };

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      setTheme(darkModeMediaQuery.matches ? 'vs-dark' : 'light');
    };

    updateTheme();
    darkModeMediaQuery.addEventListener('change', updateTheme);

    return () => {
      darkModeMediaQuery.removeEventListener('change', updateTheme);
    };
  }, []);

  const handleExplainClick = () => {
    alert(`Explain the content of ${currentFile}`);
  };

  return (
    <PageContainer scrollable>
      <div className="flex gap-4 p-4">
        {/* File Explorer Card */}
        <div className="flex-shrink-0 p-4 bg-white dark:bg-black rounded-lg shadow-lg md:w-1/6 w-full flex flex-col" style={{ height: 'calc(100vh - 120px)' }}> {/* Ensure height is maintained */}
          <h2 className="text-lg md:text-xl font-semibold mb-4">File Explorer</h2>
          <div className="flex-1 overflow-y-auto">
            <TreeView data={files} onFileClick={handleFileClick} />
          </div>
        </div>

        {/* Code Editor Card */}
        <div className="flex-1 p-4 bg-white dark:bg-black rounded-lg shadow-lg md:w-1/2 w-full relative"> {/* Added relative positioning */}
          <div className="flex items-center justify-between mb-4"> {/* Flex container for heading and button */}
            <h2 className="text-lg md:text-xl font-semibold">Code Editor</h2>
            <button
              className="flex items-center px-4 py-2 text-xs md:text-sm bg-white text-black border border-black rounded-full hover:bg-gray-100 focus:outline-none font-bold"
              onClick={handleExplainClick}
            >
              <Sparkle className="mr-2 h-5 w-5" /> {/* Sparkle icon with margin to the right */}
              Explain
            </button>
          </div>

          <div className="w-full h-[400px] md:h-[500px] border border-gray-300 dark:border-gray-700 rounded-b-lg">
            <Editor
              height="120%"
              defaultLanguage="javascript"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme={theme}
              language={language}  // Set the detected language here
            />
          </div>
        </div>

        {/* Chat Card */}
        <div className="flex-shrink-0 flex flex-col p-4 bg-white dark:bg-black rounded-lg shadow-lg md:w-1/4 w-full">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Chat</h2>
          <div className="flex-grow overflow-y-auto mb-4">
            {/* Chat messages would go here */}
          </div>
          <div className="mt-auto">
            <InputBar />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CodeExplorer;
