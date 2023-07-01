import React from 'react';
import './Quotes.css';
import {IQuotesMut} from "../../types";
import Quote from "../../components/Quote/Quote";

interface Props {
    posts: IQuotesMut[];
}

const Quotes:React.FC<Props> = ({posts}) => {

    console.log(posts);
    return (
        <div className='p-4 w-50'>
            {posts.map((el) => (
                <Quote author={el.author} category={el.category} text={el.text} id={el.id}/>
            ))}
        </div>
    );
};

export default Quotes;