import React from 'react';
import Menu from "./Menu";
const Base=({
    title="MY TITLE",
    description="MY DESCRIPTION",
    className="bg_dark text-white p-4",
    children

})=> (
    <div>
        <Menu/>
        <div className="container-fluid">
            <div className="jumbotron bg-dark text-white text-center">
                <h2 className="display-4">{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
        <footer className="footer bg-dark mt-auto.py-1">
            <div className="container-fluid bg-info text-white text-center py-1">
                <h4>if you got any questions feel free to reach out</h4>
                <button className="btn btn-success btn-lg">Contact us</button>
            </div>
            <div className="container"></div>
                <span className="text-muted">
                    <center>An Amazing place to <span className="text-white">Learn</span></center>
                </span>
        </footer> 
        
    </div>
)

export default Base;