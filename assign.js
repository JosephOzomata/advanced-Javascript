// let comments = [];

// function renderComment(comment, container, level = 1) {
//     const commentItem = document.createElement('li');
//     commentItem.className = 'p-4 bg-gray-50 rounded-lg shadow';
//     commentItem.style.listStyle = 'none';
//     commentItem.innerHTML = `
//         <div class="flex items-center mb-2">
//             <img src="https://via.placeholder.com/50" class="w-10 h-10 rounded-full mr-4" alt="Commenter Avatar">
//             <p class="text-gray-800">${comment.text}</p>
//         </div>
//         ${level < 2 ? '<button class="reply-button text-blue-500 text-sm mt-2">Reply</button>' : ''}
//         <ul class="space-y-4"></ul>
//     `;

//     const replyButton = commentItem.querySelector('.reply-button');
//     const replyContainer = commentItem.querySelector('ul');

//     if (replyButton) {
//         replyButton.addEventListener('click', () => {
//             const replyForm = document.createElement('div');
//             replyForm.className = 'reply-form mt-2';
//             replyForm.innerHTML = `
//                 <input type="text" placeholder="Write a reply..." class="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required>
//                 <button type="submit" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button>
//             `;
//             replyButton.insertAdjacentElement('afterend', replyForm);

//             const submitButton = replyForm.querySelector('button[type="submit"]');
//             const inputField = replyForm.querySelector('input');

//             submitButton.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 if (inputField.value.trim()) {
//                     const newComment = {
//                         id: Date.now(),
//                         text: inputField.value,
//                         replies: []
//                     };
//                     comment.replies.push(newComment);
//                     renderComment(newComment, replyContainer, level + 1);
//                     replyForm.remove();
//                 }
//             });
//         });
//     }

//     container.appendChild(commentItem);
// }

// document.getElementById('commentForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const commentText = document.getElementById('commentInput').value;
//     if (commentText.trim()) {
//         const newComment = {
//             id: Date.now(),
//             text: commentText,
//             replies: []
//         };
//         comments.push(newComment);
//         const commentSection = document.getElementById('nested-comment');
//         renderComment(newComment, commentSection);
//         document.getElementById('commentInput').value = ''; // Clear input
//     }
// });

// const today = document.getElementById("moment");
// const now = new Date().toLocaleString();

// today.textContent = now;






let comments = [];

function renderComment(comment, container, level = 1) {
    const commentItem = document.createElement('li');
    commentItem.className = 'p-4 bg-gray-50 rounded-lg shadow';
    commentItem.style.listStyle = 'none';
    commentItem.innerHTML = `
        <div class="flex items-center mb-2">
            <img src="https://via.placeholder.com/50" class="w-10 h-10 rounded-full mr-4" alt="Commenter Avatar">
            <p class="text-gray-800">${comment.text}</p>
            <button class="delete-button text-red-500 text-sm ml-4">Delete</button>
        </div>
        ${level < 5 ? '<button class="reply-button text-blue-500 text-sm mt-2">Reply</button>' : ''}
        <ul class="space-y-4"></ul>
    `;

    const deleteButton = commentItem.querySelector('.delete-button');
    const replyButton = commentItem.querySelector('.reply-button');
    const replyContainer = commentItem.querySelector('ul');

    deleteButton.addEventListener('click', () => {
        const confirmDelete = confirm('Are you sure you want to delete this comment?');
        if (confirmDelete) {
            const commentIndex = comments.indexOf(comment);
            if (commentIndex !== -1) {
                comments.splice(commentIndex, 1);
                commentItem.remove();
            } else {
                // Find the parent comment and remove the reply from its replies array
                const parentComment = findParentComment(comments, comment);
                if (parentComment) {
                    const replyIndex = parentComment.replies.indexOf(comment);
                    if (replyIndex !== -1) {
                        parentComment.replies.splice(replyIndex, 1);
                        commentItem.remove();
                    }
                }
            }
        }
    });

    if (replyButton) {
        replyButton.addEventListener('click', () => {
            const replyForm = document.createElement('div');
            replyForm.className = 'reply-form mt-2';
            replyForm.innerHTML = `
                <input type="text" placeholder="Write a reply..." class="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required>
                <button type="submit" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button>
            `;
            replyButton.insertAdjacentElement('afterend', replyForm);

            const submitButton = replyForm.querySelector('button[type="submit"]');
            const inputField = replyForm.querySelector('input');

            submitButton.addEventListener('click', (e) => {
                e.preventDefault();
                if (inputField.value.trim()) {
                    const newComment = {
                        id: Date.now(),
                        text: inputField.value,
                        replies: []
                    };
                    comment.replies.push(newComment);
                    renderComment(newComment, replyContainer, level + 1);
                    replyForm.remove();
                }
            });
        });
    }

    // Render replies recursively
    comment.replies.forEach(reply => {
        renderComment(reply, replyContainer, level + 1);
    });

    container.appendChild(commentItem);
}

// Helper function to find the parent comment of a reply
function findParentComment(comments, reply) {
    for (const comment of comments) {
        if (comment.replies.includes(reply)) {
            return comment;
        }
        const parentComment = findParentComment(comment.replies, reply);
        if (parentComment) {
            return parentComment;
        }
    }
    return null;
}

document.getElementById('commentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const commentText = document.getElementById('commentInput').value;
    if (commentText.trim()) {
        const newComment = {
            id: Date.now(),
            text: commentText,
            replies: []
        };
        comments.push(newComment);
        const commentSection = document.getElementById('nested-comment');
        renderComment(newComment, commentSection);
        document.getElementById('commentInput').value = ''; // Clear input
    }
});

const today = document.getElementById("moment");
const now = new Date().toLocaleString();

today.textContent = now;