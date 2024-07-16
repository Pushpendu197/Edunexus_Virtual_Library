import react, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import Typed from 'typed.js';
import React, { useEffect, useRef } from "react";




const Main = () => {

    const el = React.useRef(null);

    React.useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Welcome to our E-Library'],
            typeSpeed: 100,

            backSpeed: 50,
            loop: true

        });

        return () => {

            typed.destroy();

        };
    }, []);

    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);
    const searchBook = (evt) => {
        if (evt.key === "Enter") {
            axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU' + '&maxResults=40')
                .then(res => setData(res.data.items))
                .catch(err => console.log(err))
        }
    }


    return (
        <>
            <div className="header">
                <div className="row1">
                    <h1>" If you don’t like to read,<br /> you haven’t found the right book."</h1>
                </div>
                <div className="row2">
                    <h2><strong><span ref={el} /></strong></h2>
                    <div className="search">
                        <input type="text" placeholder="Enter Your Book Name"
                            value={search} onChange={e => setSearch(e.target.value)}
                            onKeyPress={searchBook} />
                        <button className="search-icon"><i className="fas fa-search"></i></button>
                    </div>
                    <img src="./images/lib3.png" alt="" />
                </div>
            </div>

            <div className="container">
                {
                    <Card book={bookData} />
                }
            </div>


        </>
    )
}
export default Main;