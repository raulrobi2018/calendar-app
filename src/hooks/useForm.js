import React, {useEffect, useState} from "react";

export const useForm = (initialState = {}) => {
    const [values, setvalues] = useState(initialState);

    const reset = () => {
        setvalues(initialState);
    };

    // Desestructuro target del event
    const handleInputChange = ({target}) => {
        setvalues({
            ...values,
            // Le pone el nombre del input recibido (atributo name) y le asigna el valor cargado
            [target.name]: target.value
        });
    };

    // Retorna el estado y las funciones para manejarlas en otros componentes
    return [values, handleInputChange, reset];
};
