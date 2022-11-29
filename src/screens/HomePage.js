
import { useState, useEffect } from 'react';
import { getAllDiary, sortDiaries } from '../api/functions';
import CardList from '../components/CardList';

import { SORT_CREATED_ASC, SORT_CREATED_DESC, SORT_LAST_EDITED_ASC, SORT_LAST_EDITED_DESC } from '../api/constants'
function HomePage() {

  useEffect(()=>{
    getDiaryFromAPI()
  },[])

  const [diaries, setDiaries] = useState([])

  const [sort, setSort] = useState(SORT_LAST_EDITED_DESC)

  const getDiaryFromAPI = async () =>{
    const result = await getAllDiary();
    setDiaries(result)
  }

  const updateSort = list => {
      var data = {
        sort,
        list
      }

      const result = sortDiaries(data)
      return result
  }


  return (
      <CardList styles={'columns-2 md:columns-3 lg:columns-4 xl:columns-5'} listDiaries={updateSort(diaries)} />
  );
}

export default HomePage;
