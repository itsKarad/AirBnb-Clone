import React, { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import MapExplorer from '../components/MapExplorer';

import './Explorer.css';
const Explorer = (props) => {
    
    return (
        <div class = "container">
            <div className = "explorer-header">
                Explore
            </div>
            <div className = "explorer-map-container">
                <MapExplorer></MapExplorer>
            </div>
        </div>
    );
};
export default Explorer;