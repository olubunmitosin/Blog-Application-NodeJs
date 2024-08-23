export const createPostRules = {
    title: 'required|minLength:5',
    content: 'required|minLength:20'
};

export const updatePostRules = {
    id: 'required',
};

export const deletePostRules = {
    id: 'required',
};