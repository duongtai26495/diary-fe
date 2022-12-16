
import { useState, useEffect } from 'react';
import { MAX_PAGE_DIARY } from '../api/constants';
import { getAllDiary } from '../api/functions';
import CardList from '../components/CardList';

import PaginationControls from '../components/PaginationControls';
import { useStore } from '../store';
import { loadAllDiaries, setDiaryPagination } from '../store/actions';
function HomePage() {

  const [state, dispatch] = useStore()
  const { listDiaries, diaryPagination } = state
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    const getDiaryFromAPI = async () => {
      const result = await getAllDiary(diaryPagination);
      dispatch(loadAllDiaries(result))
      setLoaded(true)
    }
    getDiaryFromAPI()
  }, [diaryPagination])




  return (
    isLoaded == true
      ?
      <>
        <CardList styles={'columns-2 md:columns-3 lg:columns-4 '} listDiaries={listDiaries} />
        {
          Number(localStorage.getItem(MAX_PAGE_DIARY)) >= 1 
          &&
          <PaginationControls />
        }
      </>

      :
      <h1>Loading</h1>
  );
}

export default HomePage;
