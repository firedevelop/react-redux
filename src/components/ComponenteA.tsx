// src/components/ComponenteA.tsx
import React from 'react';
import ComponenteB from './ComponenteB';

// Definimos los tipos de las props que este componente espera recibir
interface ComponenteAProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ComponenteA: React.FC<ComponenteAProps> = ({ theme, setTheme }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Soy el Componente A</h2>
      <ComponenteB theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default ComponenteA;