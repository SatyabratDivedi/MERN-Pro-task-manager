import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  peopleAddFlashPage: false, 
  successFlashPage: {
    display: false,
    addedEmail:''
  },
  addTodoFlashPage: false,
  updateTodoFlashPage: false,
  deleteTodoFlashPage: false,
  logoutFlashPage: false,
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
        },
        updateTodoFlash: (store, action) => {
            store.updateTodoFlashPage = action.payload
        },
        deleteTodoFlash: (store, action) => {
            store.deleteTodoFlashPage = action.payload
        },
        logoutFlash: (store, action) => {
            store.logoutFlashPage = action.payload
        }
    }
})

export const { peopleAddFlash, successFlash, addTodoFlash, updateTodoFlash, deleteTodoFlash, logoutFlash} = allFlashSlice.actions
export default allFlashSlice.reducer