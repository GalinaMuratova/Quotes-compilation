import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CATEGORIES } from "../../constants";
import axiosApi from "../../AxiosApi";
import { IQuotes } from "../../types";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

interface Props {
    add:( ) => void;
}

const AddQuote:React.FC<Props> = ({add}) => {
    const navigate = useNavigate();
    const [text, setText] = useState<IQuotes>({
        author: '',
        category: '',
        text: ''
    });
    const [loading, setLoading] = useState(false);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosApi.post('quotes.json', text);
        } finally {
            navigate('/');
            setLoading(false);
            add();
        }
    };

    const change = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setText((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    let form = (
        <form onSubmit={submit} className='d-flex flex-column mx-5'>
            <select
                id='category'
                value={text.category}
                onChange={change}
                name='category'
                className='my-4 form-control'>
                <option value=''>Select category</option>
                {CATEGORIES.map((el) => (
                    <option key={el.id} value={el.id}>{el.title}</option>
                ))}
            </select>
            <input
                required
                type='text'
                id='author'
                value={text.author}
                onChange={change}
                name='author'
                className='my-4 form-control'
                placeholder='Author'
            />
            <textarea
                required
                id='text'
                value={text.text}
                onChange={change}
                name='text'
                className='my-4 form-control'
                placeholder='Quote text'
            />
            <button type='submit' className='btn btn-dark'>Add</button>
        </form>
    );

    if (loading) {
        form = <Spinner />
    }

    return (
        <div className='text-center'>
            {form}
        </div>
    );
};

export default AddQuote;
