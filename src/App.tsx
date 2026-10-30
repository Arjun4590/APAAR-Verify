import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DemoSessionProvider } from './context/DemoSessionContext';
import { AppRouter } from './router';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DemoSessionProvider>
        <AppRouter />
      </DemoSessionProvider>
    </BrowserRouter>
  );
};

export default App;

