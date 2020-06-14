import React from 'react';
import './Post.css'

export function Post(props) {
    const button = props.isSingle ? (
        <div>
            <button
            onClick={()=>props.onEditButtonClick(props.post)}
            >Edit
            </button>
            <button
                onClick={() => props.onDeleteButtonClick(props.id)}>
                Delete
                </button>
        </div>
    ) : (
            <button
                onClick={() => props.onViewButtonClick(props.post)}
            >
                View
            </button>
        );

    return (
        <div className="post" style={props.style}>
            <h1>{props.post.title}</h1>
            <p>{props.post.text}</p>
            {button}
        </div>
    )

}