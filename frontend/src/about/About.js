import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import file from './about.md';
import './About.css';
const About = (props) => {
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        fetch(file)
          .then((res) => res.text())
          .then((text) => setMarkdown(text));
      }, []);
    

    return (
        <div className = "container mb-3">
            <ReactMarkdown children = {markdown} className = "markdown-container"></ReactMarkdown>
        </div>
    );
};

export default About;