import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:"search",
    initialState:{      
        query:'',
        activeTab:'photos',
        results:[],
        loading:false,
        error:null
    },
    reducers:{      
        setQuery:(state,action)=>{
            
        }   ,
        setActiveTab:(state,action)=>{
            
        },
        setResults:(state,action)=>{
            
        },
        setLoading:(state,action)=>{
            
        },
        setError:(state,action)=>{
        }
    }
})