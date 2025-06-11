import { Outlet } from "react-router-dom";
import Navbar from "../Components/navbar";

export default function PrivateLayout(){
    return (
        <>
        <Navbar/>
        <main style={{ padding: '1rem'}}>
            <Outlet/>
        </main>
        </>
    );
}