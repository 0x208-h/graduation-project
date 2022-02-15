import React from 'react';
import { Button, DatePicker, Input } from 'antd'
import './App.css';

function App() {
  return (
    <div className="App">
      <Button type="primary" className=" m-3 p-4">Primary Button</Button>
      < DatePicker />
      <Input.Search enterButton />
      <Button className=" bg-purple-300"> primary</Button>
      {/* <Button className=" bg-test"> test</Button> */}
      <Button className=" hover:bg-sky-800">Test</Button>
      <div className=" underline">22222</div>
    </div>
  );
}

export default App;
