import React from "react";
import Nav from "./Nav"
import ListNhanVien from "../components/ListNhanVien.jsx"
import "tailwindcss/tailwind.css";

const Home = () => {
    return (<>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        </head>
        <body>
            <Nav></Nav>
            {<ListNhanVien></ListNhanVien>}
        </body>
    </>)
}
export default Home;