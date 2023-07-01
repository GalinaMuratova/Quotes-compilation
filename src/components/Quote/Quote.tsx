import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axiosApi from "../../AxiosApi";
import Spinner from "../Spinner/Spinner";
import './Quote.css';

interface Props {
    author: string,
    category:string,
    text:string,
    id:string
    clean: () => void;
}

const Quote:React.FC<Props> = ({author, category,text, id, clean}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const deletePost = (async () => {
        setLoading(true);
        try {
            await axiosApi.delete(`/quotes/${id}.json`);
        } finally {
            setLoading(false);
            navigate('/');
            clean();
        }
    });

    let blockQuote = (
        <div className="mb-4 quote-block d-flex flex-column card">
            <div className='block-header d-flex justify-content-between'>
                <span className='text-secondary me-3'>{'Author: ' + author}</span>
                <span className='text-capitalize'>{category}</span>
            </div>
            <div className='block-body'>
                <h4 className='py-4 ps-5 ms-3 '>{text}</h4>
            </div>
            <div className='block-footer d-flex p-3 justify-content-end'>
                <Link to={'/edit/' + id} className='btn btn-dark mx-3'>Edit</Link>
                <button type='button' className='btn btn-danger' onClick={deletePost}>Delete</button>
            </div>
        </div>
    );

    if (loading) {
        blockQuote = <Spinner />
    }

    return (
        <>
            {blockQuote}
        </>
    );
};

export default Quote;