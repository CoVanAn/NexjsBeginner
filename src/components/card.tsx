"use client";
import { useState } from 'react';
import './card.scss'
import custom from './custom/card.module.scss'
import clsx from 'clsx';

const Card = () => {
    const [isActive, setIsActive] = useState(true);
    const [isLarge, setCustom1] = useState(true);
    return (
        <>
        <div className={clsx(custom.card, {
            [custom.large]: isLarge,
            [custom.active]: isActive
        })}>
            <h1>Card</h1>
        </div>
        <div className="bg-primary text-primary-foreground">Hello</div>
        </>

    );
}

export default Card;