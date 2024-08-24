import Watermark from './Watermark';
import React, { type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default ({ children }: Props) => (
    <div className={'text-gray-200 bg-gradient-to-br from-blue-950 to-zinc-900 min-h-screen relative'}>
        <div className={'absolute bottom-0 right-0 p-2 cursor-default'}>
            <Watermark />
        </div>
        {children}
    </div>
);
