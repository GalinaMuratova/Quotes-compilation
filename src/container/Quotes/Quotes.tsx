import React from 'react';
import './Quotes.css';
import {IQuotesMut} from "../../types";
import Quote from "../../components/Quote/Quote";

interface Props {
    posts: IQuotesMut[];
    cleanQuote: () => void;
}

const Quotes:React.FC<Props> = ({posts, cleanQuote}) => {

    const reversedPosts = [...posts].reverse();

    return (
        <div className='p-4 w-50'>
            {reversedPosts.map((el) => (
                <Quote author={el.author} category={el.category} text={el.text} id={el.id} clean={cleanQuote}/>
            ))}
        </div>
    );
};

export default Quotes;