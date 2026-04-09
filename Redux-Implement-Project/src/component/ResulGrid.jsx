import React from 'react'
import { fetchGIF, fetchPhotos, fetchVideos } from "../api/mediaApi";
import { setQuery,setLoading,setError,setResults } from '../redux/features/searchSlice';
import { useDispatch,useSelector } from 'react-redux';

const ResulGrid = () => {
    const { query,activeTab,results,loading,error } = useSelector((state) => state.search);
    const dispatch = useDispatch();

  return (
    <div>
        <h1>Result Grid</h1>
    </div>
  )
}

export default ResulGrid
