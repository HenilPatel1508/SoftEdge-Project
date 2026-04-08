import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counterslice';
const Store = configureStore({
  reducer: {
        counter:counterReducer
    }
});

export default Store;