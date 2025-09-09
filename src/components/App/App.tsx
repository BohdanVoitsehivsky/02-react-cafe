import { useState } from 'react'

import css from './App.module.css'
import CafeInfo from '../CafeInfo/CafeInfo'
import  type { Votes, VoteType } from '../../types/votes'
import VoteOptions from '../VoteOptions/VoteOptions';
import  VoteStats  from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';
import App1 from '../module3/lesson1/module3/lesson1';
import OrderForm from '../module3/lesson1/module3/lesson1FormAscomponent';
import SearchForm from '../module3/lesson1/module3/http';
import axios from 'axios';
interface Article {
  objectID: string;
  title: string;
  url: string;
}

interface ArticlesHttpResponse {
  hits: Article[];
}
function App() {

  const [articles, setArticles] = useState<Article[]>([]);


  // 1. Додаємо стан індикатора завантаження
  const [isLoading, setIsLoading] = useState(false);

  // 1. Оголошуємо стан

  const [isError, setIsError] = useState(false);

  

  
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0
  });
 const handleVote = (type: VoteType) => {
setVotes((prev) => ({
  ...prev,
  [type]: prev[type] +1,

}))
};

 const resetVotes = () => {
  setVotes({
     good: 0,
    neutral: 0,
    bad: 0
  })
};
  const totalVotes =  votes.good + votes.neutral + votes.bad;
const positiveRate = totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;
const handleSearch = async (topic: string) => {
  // 2. Додаємо блок try...catch

  try{
    setIsLoading(true);
    // 3. Скидаємо стан помилки в false перед кожним запитом
    setIsError(false);
    
    


  

// 2. змінюємо індикатор на true перед запитом



  // Тут будемо виконувати HTTP-запит
  const response = await axios.get<ArticlesHttpResponse>(
    `https://hn.algolia.com/api/v1/search?query=${topic}`
  );
  setIsLoading(false);
  setArticles(response.data.hits)
  
  
  
} catch {
  // 4. Встановлюємо стан isError в true
  setIsError(true);
} finally {
  // / 5. Встановлюємо стан isLoading в false
      // після будь якого результату запиту
      setIsLoading(false);
}
};


  return (
    
      
        <div className={css.app}>

          <CafeInfo />
          <VoteOptions 
          onVote={handleVote}
          onReset={resetVotes}
          canReset={totalVotes > 0}
          />
          {totalVotes > 0 ? (
          <VoteStats 
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}/>

          ) : (

          <Notification /> )}

          <App1 />
          <OrderForm />
          <>
          <SearchForm onSubmit={handleSearch}/>
          
            
            {isLoading && <p>Loading data, please wait...</p>}
            {isError && <p>Whooops, something went wrong...</p>}
            {articles.length > 0 && (
            <ul>
              {articles.map(({objectID, url, title}) => (
                <li key={objectID}>
                  <a href={url} target="_blank">{title}</a>
                   </li>
              ))}
              
              
              {/* {articles.length > 0 && <ArticleList items={articles}/>} */}
            </ul>
            )}
            </>
          
          
          
        </div>

    
  );
}


export default App  
