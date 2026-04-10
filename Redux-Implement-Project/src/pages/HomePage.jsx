
import { useSelector } from 'react-redux'
import ResultGrid from '../component/ResulGrid'
import SearchBar from '../component/SearchBar'
import Tabs from '../component/Tabs'
const HomePage = () => {

    const { query } = useSelector((store) => store.search)

    return (
        <div>

            <SearchBar />

            {query != '' ? <div><Tabs /><ResultGrid /></div> : ''}
        </div>
    )
}

export default HomePage