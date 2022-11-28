
import { useState, useEffect } from 'react';
import { getAllDiary } from '../api/functions';
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
    var newList = []
    switch (sort) {

      case SORT_LAST_EDITED_DESC:
        newList = list.sort((a, b) => { return a.last_edited.localeCompare(b.last_edited) }).reverse()
        break
      case SORT_LAST_EDITED_ASC:
        newList = list.sort((a, b) => { return a.last_edited.localeCompare(b.last_edited) })
        break
      case SORT_CREATED_ASC:
        newList = list.sort((a, b) => { return a.created_at.localeCompare(b.created_at) })
        break
      case SORT_CREATED_DESC:
        newList = list.sort((a, b) => {return a.created_at.localeCompare(b.created_at)}).reverse()
        break
      default:
        newList = list.sort((a, b) => { return a.last_edited.localeCompare(b.last_edited) }).reverse()
        break
    }

    return newList
  }


  return (
      <CardList listDiaries={updateSort(diaries)} />
  );
}

export default HomePage;
