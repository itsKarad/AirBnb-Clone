import React from 'react';
import Input from '../../UI/Input';
import './NewPlace.css';

const NewPlace = (props) => {
    return (
        <div className = "add-place-container container">
            <div className = "add-place-header">
                Add your place
            </div>
            <div className = "add-place-form-container">
                <form className = "add-place-form">
                    <Input type = "text" element = "input" label = "Title"></Input>
                    <Input type = "text" element = "input" label = "Description"></Input>
                    <Input type = "text" element = "input" label = "Address"></Input>
                    <Input type = "text" element = "input" label = "Location"></Input>
                </form>
            </div>

        </div>
    );
};

export default NewPlace;    