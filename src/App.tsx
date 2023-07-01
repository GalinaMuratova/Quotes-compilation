import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import Quotes from "./container/Quotes/Quotes";
import AddQuote from "./container/AddQuote/AddQuote";
import EditeQuote from "./container/EditeQuote/EditeQuote";
import CategoryList from "./components/CategoryList/CategoryList";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
        <Routes>
            <Route path='/' element={
                <div className='d-flex justify-content-around'>
                    <CategoryList />
                    <Quotes />
                </div>
            } />
            <Route path='/add-quote' element={
                <AddQuote />
            }/>
            <Route path='/edite' element={
                <EditeQuote />
            } />
        </Routes>
    </>
  );
}

export default App;
