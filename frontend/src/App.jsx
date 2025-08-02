import React, {useState, useEffect, useRef } from 'react';
import logo from './assets/images/time-shutdown.ico';
import './App.css';
import {Quit, WindowMinimise} from "../wailsjs/runtime/runtime"
import {
    HandlePowerOff,
} from "../wailsjs/go/main/App";
import {
    Button,
    Input,
    message,
    Dropdown,
    Menu,
    Progress,
} from "antd";
import {
    PoweroffOutlined,
} from '@ant-design/icons';

function App() {
    const [val, setVal] = useState(2);
    const [btnDisable, setBtnDisable] = useState(false);
    const [isNormalIcon, setisNormalIcon] = useState(true);
    const [percent, setPercent] = useState(0);
    const [isShowProgress, setIsShowProgress] = useState(false);
    const timeList = [2, 10, 20, 60, 120, -1];

    useEffect(() => {
        // 组件挂载后执行一次
        const saveVal = localStorage.getItem('isNormalIcon');
        if (saveVal !== null) {
            setisNormalIcon(saveVal === 'true')
        }

        // 读取本地存储的定时时间
        var timeVal = localStorage.getItem('timedClock')
        if (timeVal!==undefined && timeVal>0){
            setVal(timeVal)
        }
    }, []);

    const setStorage = (key, value) => {
        localStorage.setItem(key, value)
    }

    const rightClickMenu = [
        {
            key: 'toggle',
            label: '切换按钮样式',
            onClick: () => {
                const newVal = !isNormalIcon
                setisNormalIcon(isNormalIcon => !isNormalIcon)
                setStorage('isNormalIcon', newVal.toString())
            }
        },
    ]

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

        // 本地存储定时时间
        if (val>0) {
            setStorage('timedClock', val)
        }

        let value = val.toString()
        var ret = await HandlePowerOff(value)
        if ( ret !== ''){
            message.error('执行错误: ' + ret)
        }else{
            setIsShowProgress(true);
            let timer = 12000
            message.info('即将在'+ Number(timer/1000) + '秒后自动退出')

            setInterval(() => {
                setPercent(percent => percent + 1)
            }, (timer-1000)*0.97/100)
            setTimeout(() => {
                WindowMinimise();
            }, 1000);
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
                    type='number'
                    value={val}
                    onChange={(e) => {
                        setVal(e.target.value)
                    }}
                    onClick={(e) => {
                        e.target.select();
                    }}
                    addonAfter='分钟'
                />
            </Dropdown>
            
            <Dropdown
                menu={{
                    items: rightClickMenu,
                }}
                trigger={['contextMenu']}
            >
                {isNormalIcon ? (
                    <Button
                        style={{
                            marginTop: '20px',
                            backgroundColor: 'transparent',
                            width: '162px',
                            height: '128px',
                        }}
                        onClick={handlePowerOff}
                        disabled={btnDisable}
                        icon={<PoweroffOutlined style={{ fontSize: '600%' }} />}
                    />
                ) : (
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
                        <img src={logo} alt="logoaaa" style={{ width: '80%', height: '80%' }} />
                    </Button>
                )}
            </Dropdown>
            <Progress percent={percent} showInfo={false} style={{width: '65%', visibility: isShowProgress ? 'visible' : 'hidden'}} />
        </div>
    )
}

export default App
