import React, {useEffect, useRef} from 'react';
import cl from './CommentItem.module.css'
import '../../../utils/dateFormat'
import {dateFormat} from "../../../utils/dateFormat";

const CommentItem = ({comment, getCommentHeight, isEnd}) => {
    const bodyRef = useRef()

    useEffect(() => {
        if (isEnd) {
            bodyRef.current.setAttribute('style', 'margin-bottom: 0')
        } else {
            bodyRef.current.setAttribute('style', 'margin-bottom: 15px')
        }
        getCommentHeight(bodyRef.current)
    }, [])

    return (
        <div className={cl.main} ref={bodyRef}>
            <span className={cl.author}>{comment.author}</span>
            <span className={cl.date}>{dateFormat(comment.lastUpdated)}</span>
            <div className={cl.body}>{comment.body}</div>
        </div>
    );
};

export default CommentItem;