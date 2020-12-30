const makeHash = (length: number, special: boolean = false) => {
    let result = '';
    const specialCharacters = `!@#$%^&*()_+-=][|}{:/.,><~`;
    const normalCharacters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
    const characters = special ? normalCharacters + specialCharacters : normalCharacters;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export default makeHash;
