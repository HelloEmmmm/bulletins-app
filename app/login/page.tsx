"use client"

import {useEffect, useState} from "react";
import {LoginInput} from "../components/LoginInput";

type PageType = 'login' | 'register'

export default function Login() {

    const [pageType, setPageType] = useState<PageType>('login')

    return (
        <div className={'w-full h-[100vh] flex justify-center items-center'}>
            <div className="max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <LoginInput label={'账号'} />
                    <LoginInput label={'密码'} />
                    <LoginInput label={'手机号'} />
                    {
                        pageType === 'register' && <LoginInput label={'邀请码'} />
                    }
                    <div className="flex items-center justify-between mt-6">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button">
                            登录
                        </button>
                        <a onClick={e => {
                            setPageType(pageType === 'login' ? 'register' : 'login')
                        }} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        >
                            还没有账号？
                        </a>
                    </div>
                </form>
                <button
                    onClick={() => {
                        window.ipc.send('message', 'Hello')
                    }}
                >
                    Test IPC
                </button>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2024 Riches Corp. All rights reserved.
                </p>
            </div>
        </div>
    );
}
