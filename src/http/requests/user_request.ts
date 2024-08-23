export const loginRules = {
    email: 'required|email',
    password: 'required'
};

export const registerRules = {
    email: 'required|email',
    name: 'required|string|minLength:5|maxLength:200',
    password: 'required|string|min:8',
};