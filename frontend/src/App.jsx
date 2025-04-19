import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";
import {
    Button,
    Input,
    message,
} from "antd";
import {
    PoweroffOutlined,
} from '@ant-design/icons';

function App() {
    const [resultText, setResultText] = useState("Please enter your name below");
    const [name, setName] = useState('');
    

    return (
        <div id="my-main">
            <Input 
                style={{
                    width: '40%',
                }}
            />
            
            <Button
                type="primary"
                icon={<PoweroffOutlined />}
                style={{
                    marginTop: '10px',
                    width: '100px',
                    height: '100px',
                }}
            >
            </Button>
        </div>
    )
}

export default App
