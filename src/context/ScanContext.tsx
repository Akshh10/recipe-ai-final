import { createContext, useContext, useState, ReactNode } from 'react';

interface ScanContextType {
  scannedIngredients: string[];
  setScannedIngredients: (ingredients: string[]) => void;
}

const ScanContext = createContext<ScanContextType>({
  scannedIngredients: [],
  setScannedIngredients: () => {},
});

export const useScan = () => useContext(ScanContext);

export const ScanProvider = ({ children }: { children: ReactNode }) => {
  const [scannedIngredients, setScannedIngredients] = useState<string[]>([]);

  return (
    <ScanContext.Provider value={{ scannedIngredients, setScannedIngredients }}>
      {children}
    </ScanContext.Provider>
  );
};
