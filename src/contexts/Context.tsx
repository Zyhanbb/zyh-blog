import React from 'react';
import type { Dispatch, SetStateAction } from 'react';


// 定义 Context 类型
type MyContextType = {
  data: boolean;
  setData: Dispatch<SetStateAction<boolean>>;
};

// 创建 Context，初始值为 undefined
const MyContext = React.createContext<MyContextType | undefined>(undefined);

export default MyContext;
