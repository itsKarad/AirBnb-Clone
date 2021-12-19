import React, {useEffect, useState} from 'react';
import './CheckBox.css';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

const CheckBox = (props) => {
    let initialValue = false;
    if(props.value){
        initialValue = props.value;
    }
    console.log(props);
    console.log(initialValue);
    const [isChecked, setIsChecked] = useState(initialValue);

    const onChangeHandler = (event) => {
        const previousVal = isChecked;
        setIsChecked(!previousVal);
    }
    useEffect(() => {
        props.onInput(props.id, isChecked, true);
    }, [isChecked]);

    return (
        <div className='form form-group'>
            <Checkbox onChange={onChangeHandler} checked={isChecked}>{props.label}</Checkbox>
        </div>
    )
};

export default CheckBox;