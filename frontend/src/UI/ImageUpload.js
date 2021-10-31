import React, {useRef, useState, useEffect} from 'react';
import './ImageUpload.css'
const ImageUpload = (props) => {
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [showPreview, setShowPreview] = useState(false);
    const [previewURL, setPreviewURL] = useState();
    const [isValid, setisValid] = useState(false);
    const pickImageHandler = (event) => {
        event.preventDefault();
        // Opens up file picker
        filePickerRef.current.click();
    }
    const pickedHandler = (event) => {
        let pickedFile = null;
        let localValidity = false;
        if(event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            console.log(pickedFile);
            setFile(pickedFile);
            setisValid(true);
            localValidity = true;
            setShowPreview(true);            
        }
        else{
            setisValid(false);
        }     
        props.onInput(props.id, pickedFile, localValidity);   
    }
    useEffect(() => {
        if(file){
            const fileReader = new FileReader();        
            fileReader.onload = () => {
                setPreviewURL(fileReader.result);
                setShowPreview(true);
            };
            fileReader.readAsDataURL(file);
        }
        
    }, [file])
    return (
        <div className = "form form-group">
                <label>{props.label}</label>
                <input 
                    type = "file"                   
                    id = {props.id}
                    ref = {filePickerRef}
                    style = {{display: 'none'}}
                    accept = "image/*"
                    onChange = {pickedHandler}
                ></input>
                <div className = "image-upload">
                    { showPreview && 
                        <div class = "image-upload-preview">
                            <img class = "image-upload-profile-photo" src = {previewURL} alt = "Preview"></img>
                        </div>
                    }
                    <button onClick = {pickImageHandler} class = "btn btn-primary">Upload an image</button>
                </div>   
                {!isValid && <p style = {{color: "red"}}>You must upload a provide picture!</p>}             
        </div>
    );
}

export default ImageUpload;