import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { CATEGORIES } from '../../constants';
import './CategoryList.css';

const CategoryList = () => {
    return (
        <div className='category-block'>
            <ul className='category-list'>
                <NavLink className='category-list' to={'/'}>All</NavLink>
                {CATEGORIES.map((el) => (
                    <NavLink
                        key={el.id + el.title}
                        className='category-list'
                        to={`/${el.id}`}
                    >
                        {el.title}
                    </NavLink>
                ))}
            </ul>
            <Outlet />
        </div>
    );
};

export default CategoryList;

