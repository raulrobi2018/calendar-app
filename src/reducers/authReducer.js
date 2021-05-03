//Se inicializa en true para verificar si el usuario está
//autenticado
const initialState = {
    checking: true
    // uid: null,
    // name: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
