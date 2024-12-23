import React from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import './Likes.css'

const Likes = ({ likes, id }) => {
    if (likes.length > 0) {
        return likes.find((like) => like === id)
            ? (
                <><ThumbUpAltIcon fontSize="small" /><span style={{ textTransform: 'none' }}>&nbsp;{likes.length > 2 ? `you and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</span></>
            ) : (
                <><ThumbUpAltOutlinedIcon fontSize="small" /><span style={{ textTransform: 'none' }}>&nbsp;{likes.length} {likes.length === 1 ? 'like' : 'likes'}</span></>
            );
    }
    return <><ThumbUpAltOutlinedIcon fontSize="small" /><span>&nbsp;Like</span></>;
};

export default Likes;