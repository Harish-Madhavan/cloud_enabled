import React, { createContext, useContext, useState, useEffect } from 'react';

const CalcContext = createContext();

export function CalcProvider({ children }) {
  // Shared history state across all calculator modes
  const [history, setHistory] = useState([
    {
      id: 'calc-1',
      mode: 'Standard',
      equation: '128 * 4.5',
      result: '576',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString()
    },
    {
      id: 'calc-2',
      mode: 'Scientific',
      equation: 'sqrt(256) + 12^2',
      result: '160',
      timestamp: new Date(Date.now() - 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString()
    }
  ]);

  // Shared Memory Register (M+, M-, MR, MC)
  const [memory, setMemory] = useState(0);

  // Add calculation entry immutably using ES6 spread operator
  const addHistoryItem = ({ mode = 'Standard', equation, result }) => {
    const newItem = {
      id: `calc-${Date.now()}`,
      mode,
      equation,
      result: String(result),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString()
    };

    setHistory((prev) => [newItem, ...prev]);
  };

  // Clear history
  const clearHistory = () => setHistory([]);

  // Delete single history item with ES6 filter
  const deleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CalcContext.Provider
      value={{
        history,
        addHistoryItem,
        clearHistory,
        deleteHistoryItem,
        memory,
        setMemory
      }}
    >
      {children}
    </CalcContext.Provider>
  );
}

export function useCalc() {
  const context = useContext(CalcContext);
  if (!context) {
    throw new Error('useCalc must be used within a CalcProvider');
  }
  return context;
}
