
import { useState, useEffect } from 'react';
import { getAllDiary, sortDiaries } from '../api/functions';
import CardList from '../components/CardList';

import { SORT_CREATED_ASC, SORT_CREATED_DESC, SORT_LAST_EDITED_ASC, SORT_LAST_EDITED_DESC } from '../api/constants'
function HomePage() {

  const [diaries, setDiaries] = useState([])

  const [sort, setSort] = useState(SORT_LAST_EDITED_DESC)
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    const getDiaryFromAPI = async () => {
      const result = await getAllDiary();
      setDiaries(result)
      setLoaded(true)
    }
    getDiaryFromAPI()
  }, [diaries])

  const updateSort = list => {
    var data = {
      sort,
      list
    }

    const result = sortDiaries(data)
    return result
  }

  return (
    isLoaded == true
      ?
      <CardList styles={'columns-2 md:columns-3 lg:columns-4 xl:columns-5'} listDiaries={updateSort(diaries)} />
      :
      <h1>Loading</h1>
  );
}

export default HomePage;
