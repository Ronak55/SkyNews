import React, { createContext, useContext, useState, ReactNode } from 'react';

type TemperatureUnit = 'metric' | 'imperial';

type AppContextType = {
  unit: TemperatureUnit;
  setUnit: (unit: TemperatureUnit) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [unit, setUnit] = useState<TemperatureUnit>('metric')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); 

  return (
    <AppContext.Provider value={{ unit, setUnit, selectedCategories, setSelectedCategories }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
