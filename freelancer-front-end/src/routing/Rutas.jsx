import React from "react";
import {Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Crear } from "../components/pages/Crear";
import { Inicio } from "../components/pages/Inicio";
import { Recibos } from "../components/pages/Recibos";
import { Busqueda } from "../components/pages/Busqueda";
import { Recibo } from "../components/pages/Recibo";
import { Editar } from "../components/pages/Editar";

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
                    <Route path="/buscar/:busqueda" element={<Busqueda/>}/>
                    <Route path="/recibo/:id" element={<Recibo/>}/>
                    <Route path="/editar/:id" element={<Editar/>}/>



                    <Route path="*" element={
                        <div className="jumbo">
                            <h1>Error 404</h1>
                        </div>
                    }/>

                </Routes>
            </section>

            <Sidebar/>
            <Footer/>
        </BrowserRouter>
    )
};