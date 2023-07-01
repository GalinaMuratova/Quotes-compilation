import React, {useCallback, useEffect, useState} from 'react';
import {IApiText, IQuotesMut} from "../../types";
import Quote from "../../components/Quote/Quote";
import {useParams} from "react-router-dom";
import axiosApi from "../../AxiosApi";
import Spinner from "../../components/Spinner/Spinner";

interface Props {
    posts?: IQuotesMut[];
    cleanQuote: () => void;
}

const Quotes:React.FC<Props> = ({posts, cleanQuote}) => {
    const [post, setPost] = useState<IQuotesMut[]>([]);
    const [loading, setLoading] = useState(false);

    const { id} = useParams();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosApi.get<IApiText>(`/quotes.json?orderBy="category"&equalTo="${id}"`);
            const post = Object.keys(response.data).map((key) => {
                const newPost = response.data[key];
                newPost.id = key;

                return newPost;
            });
            setPost(post);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    const reversed = [...post].reverse();
    let block = (

        <div className='p-4 '>
            {reversed.map((el) => (
                <>
                    <Quote key={el.id} author={el.author} category={el.category} text={el.text} id={el.id} clean={cleanQuote}/>
                </>
            ))}
        </div>
    );

    if (posts) {
        const reversedPosts = [...posts].reverse();
        block = <div className='px-4 '>
            {reversedPosts.map((el) => (
                <Quote key={el.id} author={el.author} category={el.category} text={el.text} id={el.id} clean={cleanQuote}/>
            ))}
        </div>
    }

    if (loading) {
        block = <Spinner />
    }

    return (
        <div className='d-flex flex-column w-100'>
            <h2 className='text-center text-capitalize mb-0 mt-4'>{id}</h2>
            {block}
        </div>
    );
};

export default Quotes;