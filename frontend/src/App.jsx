import {useState} from 'react';
import logo from './assets/images/time-shutdown.ico';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";
import {
    Button,
    Input,
    message,
    Select,
    Dropdown,
} from "antd";
import {
    PoweroffOutlined,
} from '@ant-design/icons';

function App() {
    const [val, setVal] = useState(2);
    
    const timeList = [1,2,5,10,30,60, '取消定时关机'];

    const dropItems = timeList.map((item) => ({
        key: item,
        label: (
            // 这里必须将setVal用匿名函数包裹, 否则会立即执行, 触发无限重复渲染
            <a onClick={()=>{setVal(item)}}> 
                {item}
            </a>
        ),
    }))
    

    return (
        <div id="my-main">
            <Dropdown
                menu={{items: dropItems}}
            >
                <Input
                    style={{
                        width: '40%',
                    }}
                    placeholder='请输入'
                    type='number'
                    value={val}
                    onChange={(e) => {
                        setVal(e.target.value)
                    }}
                />
            </Dropdown>

            {/* <Select
                style={{
                    width: '40%',
                    marginTop: '10px',
                }}
                placeholder="Select a number"
                onChange={(e) => {
                    setVal(e);
                }}
                value={val}
            >
                {timeList.map((item) => {
                    return <Select.Option key={item} value={item}>{item}</Select.Option>
                })}
            </Select> */}
            
            <Button
                style={{
                    marginTop: '10px',
                    backgroundColor: 'transparent',
                    width: '240px',
                    height: '200px',
                }}
            >
                <img src={logo} alt="logoaaa" style={{width: '100%', height: '100%'}} />
            </Button>
        </div>
    )
}

export default App
