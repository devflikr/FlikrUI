import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useAuthCurrentUser } from "react-devflikrauth-hooks";
import { twMerge } from "tailwind-merge";
import ExtendUserAccounts from './ExtendUserAccounts';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface HeaderAvatarProps {
    children?: React.ReactNode;
}

function HeaderAvatar({ children }: HeaderAvatarProps) {

    const [user, loading] = useAuthCurrentUser();

    const [extend, setExtend] = useState(false);

    if (loading) return null;

    if (!user) return children;

    return (<>
        <Tippy content={`${user.firstname} ${user.lastname || ""}`.trim()}>
            <button className={twMerge(classNames(
                "rounded-full overflow-hidden w-16 h-10 flex flex-nowrap items-center justify-between focus-visible:bg-[#2F2E45] hover:bg-[#2F2E45] transition-all p-1 text-lg group",
                {
                    "bg-[#2F2E45] shadow-[0_0_0_2px] shadow-[#fff4]": extend,
                }
            ))} onClick={() => setExtend(bool => !bool)}>
                <img src={user.profile} alt={user.username} className="h-full rounded-full" />
                <span className="mr-0">{extend ? <ChevronUp size={20} absoluteStrokeWidth /> : <ChevronDown size={20} absoluteStrokeWidth />}</span>
            </button>
        </Tippy >
        <ExtendUserAccounts extend={extend} setExtend={setExtend} />
    </>);
}

export default HeaderAvatar;