import React from 'react';
import {Link} from "react-router-dom";

interface Props {
    author: string,
    category:string,
    text:string,
    id:string
}

const Quote:React.FC<Props> = ({author, category,text, id}) => {
    return (
        <div className="my-4 quote-block d-flex flex-column card">
            <div className='card-header'>
                <span className='text-secondary me-3'><b>{author}</b></span>
                <span>{category}</span>
            </div>
            <div className='card-body'>
                <h4 className='py-4 ps-5 ms-3 '>{text}</h4>
            </div>
            <div className='card-footer d-flex p-3 justify-content-end'>
                <Link to='/edite' className='btn btn-dark mx-3'>Edite</Link>
                <button type='button' className='btn btn-danger'>Delete</button>
            </div>
        </div>
    );
};

export default Quote;