import React from "react";
import {Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Crear } from "../components/pages/Crear";
import { Inicio } from "../components/pages/Inicio";
import { Recibos } from "../components/pages/Recibos";

export const Rutas = ()=>{
    return(
        <BrowserRouter>
            {/*LAYOUT*/}
            <Header/>
            <Nav/>

            {/*Contenido central y rutas*/}
            <section id="content" className="content">
                <Routes>
                    <Route path="/" element={<Inicio/>} />
                    <Route path="/inicio" element={<Inicio/>} />
                    <Route path="/recibos" element={<Recibos/>} />
                    <Route path="/crear-recibos" element={<Crear/>} />
                </Routes>
            </section>

            <Sidebar/>
            <Footer/>
        </BrowserRouter>
    )
};