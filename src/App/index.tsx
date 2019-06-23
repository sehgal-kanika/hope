import React from 'react';
import { Container, Button, Label } from 'semantic-ui-react';
import './index.css';

const App: React.FC = () => {
  return (
    <div className='counter-container'>
      <Button primary>+</Button>
      <Label>0</Label>
      <Button secondary>-</Button>
    </div>
  );
}

export default App;
