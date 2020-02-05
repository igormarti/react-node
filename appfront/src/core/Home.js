import React from 'react';
import Posts from '../post/Posts'

const Home = () => (
    <>
        <div className="jumbotron">
            <h2>Home</h2>
            <p className="lead" >Welcome to App-Front</p>
        </div>
        <div className="container" >
            <Posts/>
        </div>
   </>
);

export default Home;