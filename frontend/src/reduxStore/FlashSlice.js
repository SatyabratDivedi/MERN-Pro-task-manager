import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  peopleAddFlashPage: false, 
  successFlashPage: {
    display: false,
    addedEmail:''
  },
  addTodoFlashPage: false,
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
        },
        addTodoFlash: (store, action) => {
            store.addTodoFlashPage = action.payload
        }
    }
})

export const { peopleAddFlash, successFlash, addTodoFlash} = allFlashSlice.actions
export default allFlashSlice.reducer