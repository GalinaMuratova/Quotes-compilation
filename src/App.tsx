import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import Quotes from "./container/Quotes/Quotes";
import AddQuote from "./container/AddQuote/AddQuote";
import EditeQuote from "./container/EditeQuote/EditeQuote";
import CategoryList from "./components/CategoryList/CategoryList";
import {IApiText, IQuotesMut} from "./types";
import axiosApi from "./AxiosApi";

function App() {
const [posts, setPosts] = useState<IQuotesMut[]>([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await axiosApi.get<IApiText>('quotes.json');
            const post = Object.keys(response.data).map((key) => {
                const newPost = response.data[key];
                newPost.id = key;

                return newPost;
            })
            setPosts(post);
        } catch (e) {
            console.log(e)
        }
    }, []);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

  return (
    <>
      <header>
        <NavBar />
      </header>
        <Routes>
            <Route path='/' element={
                (
                    <div className='d-flex justify-content-around'>
                        <CategoryList />
                        <Quotes cleanQuote={fetchData} posts={posts}/>
                    </div>
                )
            } />
            <Route path='/add-quote' element={
                (
                    <AddQuote add={fetchData}/>
                )
            }/>
            <Route path='/edit/:id' element={
                (
                    <EditeQuote edit={fetchData}/>
                )
            } />
        </Routes>
    </>
  );
}

export default App;
