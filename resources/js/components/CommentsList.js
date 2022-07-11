import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown'

function CommentsList( props ) {
    // prepare for comments
    const [comments, setComments] = useState([]);

    // get initial displayMode and load it into comments
    useEffect(()=>{
        Axios.get('api/comments/' + props.displayMode).then(({data})=>{
            // console.log(data)
            
            setComments(data.comments)
        });
    },[props.displayMode])

    // after approving or removing we need to refresh the componenet
    const updateCommentsAfterPost = (data) => {
        let newComment = data.comment[0];

        //map over last state, only replace new comment if id matches
        const updatedComments = comments.map(obj => {
            if (obj.id === newComment.id) {
                return newComment;
            }
            return obj;
        });

        setComments(updatedComments);
    }

    // setting approved status to 1 via PUT
    const approveComment = (event) => {
        let id = event.target.parentNode.getAttribute('commentid');

        let data = {
            id:  id,
            bool: 1
        };

        Axios.put('/api/approve', data)
            .then(response => {
                updateCommentsAfterPost(response.data);
                // alert(JSON.stringify(response.data));
            }).catch(error => {
                console.log("ERROR:: ",error.data);
        });
    };

        // setting approved status to 0 via PUT
    const removeComment = (event) => {
        let id = event.target.parentNode.getAttribute('commentid');

        let data = {
            id:  id,
            bool: 0
        };

        Axios.put('/api/approve', data)
            .then(response => {
                updateCommentsAfterPost(response.data);
                // alert(JSON.stringify(response.data));
            }).catch(error => {
                console.log("ERROR:: ",error.data);
        });
    };
    return (
        <div className="comments">
            {comments.map((comment)=>{
                return(
                    <div className="comment" key={comment.id}>
                        <div className='comment__contents'>
                            <div className='comment__details'>
                                <p>{comment.name}</p>
                                <p>{comment.email}</p>
                                <p>{comment.created_at}</p>
                            </div>
                            <ReactMarkdown>{comment.comment}</ReactMarkdown>
                        </div>
                        {/* approval box while awaiting approval */}
                        { comment.approved == 0 &&
                            <div commentid={comment.id} className='comment__approval comment__approval--awaiting'>
                                <p className='comment__approvalText--awaiting'>AWAITING APPROVAL</p>
                                <button className='comment__approvalButton comment__approvalButton--awaiting' onClick={approveComment}>Approve</button>
                            </div>
                        }
                        {/* approval box while approved */}
                        { comment.approved == 1 &&
                            <div commentid={comment.id} className='comment__approval comment__approval--approved'>
                                <p className='comment__approvalText--approved'>APPROVED</p>
                                <button className='comment__approvalButton comment__approvalButton--approved' onClick={removeComment}>Remove</button>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    );
}

export default CommentsList;

if (document.getElementById('commentsList')) {
    ReactDOM.render(<CommentsList />, document.getElementById('commentsList'));
}
