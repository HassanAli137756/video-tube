import {createSlice} from '@reduxjs/toolkit'



const userSlice = createSlice(
{
    name: "userSlice",
    initialState:
    {
        userInfo:
        {
            isLoadingUser: true,
            isAuthorized: false,
            userData: {},
        }
    },
    reducers:
    {
        setUserInfo: (state, action) =>
        {
            state.userInfo = action.payload
        },

        removeUserInfo: (state, action) =>
        {
            state.userInfo = 
            {
                isLoadingUser: false,
                isAuthorized: false,
                userData: {}
            }
        }
    }
}
)


export const {removeUserInfo, setUserInfo} = userSlice.actions
export const userReducer = userSlice.reducer