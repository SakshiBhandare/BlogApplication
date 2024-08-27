import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: "loader",
    initialState: {
        loader: false,
    },
    reducers: {
        setLoaderState: (state, action) => {
            state.loader=action.payload;
        },
    },
});

export const {setLoaderState} = loaderSlice.actions;

export default loaderSlice.reducer;

export const setLoader =  (data) => {
    return async function ActionData (dispatch) {
    dispatch(setLoaderState(data));

    }
}