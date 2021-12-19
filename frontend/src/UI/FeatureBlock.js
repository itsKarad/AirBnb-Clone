import { Box } from '@chakra-ui/react';
import React from 'react';
import styles from './FeatureBlock.module.css';

const FeatureBlock = (props) => {
    return (
        <Box className = {styles["outside-block-container"]} boxShadow="2xl">
            <Box className = {styles["block-container"]}> 
                <div className = {styles["icon"]}>
                    {props.icon}
                </div>
                <div className = {styles["data"]}>
                    {props.data}
                </div>
            </Box>
        </Box>
        
    )
};

export default FeatureBlock;