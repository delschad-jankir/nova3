'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface RowDataContextType {
  rowData: any;
  setRowData: (data: any) => void;
}

const RowDataContext = createContext<RowDataContextType | undefined>(undefined);

export function RowDataProvider({ children }: { children: ReactNode }) {
  // Initialize state from local storage or set default to null
  const [rowData, setRowData] = useState<any>(() => {
    const savedData = localStorage.getItem('rowData');
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    // Save rowData to local storage whenever it changes
    if (rowData !== null) {
      localStorage.setItem('rowData', JSON.stringify(rowData));
    }
  }, [rowData]);

  return (
    <RowDataContext.Provider value={{ rowData, setRowData }}>
      {children}
    </RowDataContext.Provider>
  );
}

export function useRowData() {
  const context = useContext(RowDataContext);
  if (context === undefined) {
    throw new Error('useRowData must be used within a RowDataProvider');
  }
  return context;
}
