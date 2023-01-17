import React, { useState } from "react";

const useForm = (initialState) => {
    const [state, setState] = useState(initialState);

    return [
        state,
        ({ target: { name, value } }) => setState({ ...state, [name]: value }),
    ];
};

export default useForm;
