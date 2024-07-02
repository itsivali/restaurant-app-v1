import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Pizza() {
    const { id } = useParams();

    return (
        <div>
            <h1>Pizza Details</h1>
            <Link to={`/pizzas/${id}`}>Pizza Detail</Link>
        </div>
    );
}

export default Pizza;
