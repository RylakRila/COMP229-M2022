import React, { useEffect } from "react";

function Projects() {
    useEffect(() => {
        document.title = "Projects";
    });
    
    return (
        <div className="container">
            <h1>Our Projects</h1>
            <hr />
            <p>Here is some details for our projects...</p>
        </div>
    )
}

export default Projects;