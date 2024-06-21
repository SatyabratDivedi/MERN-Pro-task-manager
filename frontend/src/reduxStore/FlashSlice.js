import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  peopleAddFlashPage: false, 
  successFlashPage: {
    display: false,
    addedEmail:''
  },
}

export const allFlashSlice = createSlice({
    name: 'flash',
    initialState,
    reducers:{
        peopleAddFlash: (store, action) => {
            store.peopleAddFlashPage = action.payload
        },
        successFlash: (store, action) => {
            store.successFlashPage.display = action.payload.display
            store.successFlashPage.addedEmail = action.payload.addedEmail
        }
    }
})

export const { peopleAddFlash, successFlash} = allFlashSlice.actions
export default allFlashSlice.reducer