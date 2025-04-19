import {useState} from 'react';
import logo from './assets/images/time-shutdown.ico';
import './App.css';
import {Quit} from "../wailsjs/runtime/runtime"
import {
    HandlePowerOff,
} from "../wailsjs/go/main/App";
import {
    Button,
    Input,
    message,
    Dropdown,
} from "antd";
import {
    PoweroffOutlined,
} from '@ant-design/icons';

function App() {
    const [val, setVal] = useState(2);
    const [btnDisable, setBtnDisable] = useState(false);
    
    const timeList = [2, 10, 30, 60, 120, -1];

    const dropItems = timeList.map((item) => ({
        key: item,
        label: (
            // 这里必须将setVal用匿名函数包裹, 否则会立即执行, 触发无限重复渲染
            <a onClick={()=>{setVal(item)}}> 
                {item === -1 ? '取消定时关机' : item}
            </a>
        ),
    }))

    const handlePowerOff = async () => {
        setBtnDisable(true)
        setTimeout(() => {
            setBtnDisable(false)
        }, 1900);
        let value = val.toString()
        var ret = await HandlePowerOff(value)
        if ( ret !== ''){
            message.error('执行错误: ' + ret)
        }else{
            let timer = 3000
            message.info('即将在'+ Number(timer/1000) + '秒后自动退出')
            setTimeout(() => {
                Quit()
            }, timer);
        }        
    }
    

    return (
        <div id="my-main">
            <Dropdown
                menu={{items: dropItems}}
            >
                <Input
                    style={{
                        width: '55%',
                        backgroundColor: '#fff'
                    }}
                    placeholder='请输入'
                    type='number'
                    value={val}
                    onChange={(e) => {
                        setVal(e.target.value)
                    }}
                    addonAfter='分钟'
                />
            </Dropdown>
            
            <Button
                style={{
                    marginTop: '20px',
                    backgroundColor: 'transparent',
                    width: '162px',
                    height: '128px',
                }}
                onClick={handlePowerOff}
                disabled={btnDisable}
            >
                <img src={logo} alt="logoaaa" style={{width: '100%', height: '100%'}} />
            </Button>
        </div>
    )
}

export default App
