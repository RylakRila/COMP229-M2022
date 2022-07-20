import React, { useEffect } from "react";

function Services() {
    useEffect(() => {
        document.title = "Services";
    });
    
    return (
        <div className="container">
            <h1>Our Services</h1>
            <hr />
            <p>Here is some details for our services...</p>
        </div>
    )
}

export default Services;