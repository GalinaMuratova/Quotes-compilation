import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {IQuotes} from "../../types";
import axiosApi from "../../AxiosApi";
import {CATEGORIES} from "../../constants";
import Spinner from "../../components/Spinner/Spinner";

interface Props {
    edit:() => void;
}

const EditeQuote:React.FC<Props> = ({edit}) => {
    const [text, setText] = useState<IQuotes>({
        author: '',
        category: '',
        text: ''
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {id} = useParams();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosApi.get<IQuotes>(`/quotes/${id}.json`);

            console.log(response.data)
            if (response.data) {
                setText(response.data);
            }
        } finally {
            setLoading(false);
        }
    }, [id]);


    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosApi.put(`quotes/${id}.json`, text);
        } finally {
            setLoading(false);
            navigate('/')
            edit();
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
            <h2 className='my-3'>Edit quotes</h2>
            {form}
        </div>
    );
};

export default EditeQuote;