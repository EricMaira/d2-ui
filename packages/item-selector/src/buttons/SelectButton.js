import React from 'react';
import { styles } from '../styles/buttons.style';

export const SelectButton = ({ style, onClick, label }) => {
    console.log('selectbutton style', style);

    return (
    <button style={style} onClick={onClick}>
        <span style={styles.buttonText}>{label}</span>
    </button>
)};
