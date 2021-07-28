import React, { FC, SyntheticEvent, useState, useEffect } from 'react';
import PreviousSearches from '../Components/PreviousSearches';

const MY_SAVED_RESULTS = 'My Saved Results';
const SAVED_RESULTS_ROUTE = '/savedResults';
const ERROR_TEXT = 'An error has occurred. Please refresh and try again.'

interface SavedResults {
  title: string,
  location: string,
  description: string,
  link: string,
  companyName: string,
  apiWebsite: string,
  apiId: number,
  id: number,
};

const FavoritesPage: FC<any> = () => {
  const [savedResults, setSavedResults] = useState<SavedResults[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(SAVED_RESULTS_ROUTE)
      .then(res => res.json())
      .then(newSavedResults => setSavedResults(newSavedResults))
      .catch(err => {
        console.log(`An error has occurred in the FavoritesPage component while getting saved results: ${err}`);
        setError(ERROR_TEXT);
      });
  }, []);

  const deletePost = (e) => {
    const { id } = e.target;

    fetch(`/savedResults/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(() => {
      const updatedSavedResults = savedResults.filter(result => result.id !== id);
      setSavedResults(updatedSavedResults);
    }).catch((err) => {
      console.log(`An error has occurred in the FavoritesPage component while un-saving a result: ${err}`);
      setError(ERROR_TEXT);
    });
  }

  return (
    <div>
      <p>{MY_SAVED_RESULTS}</p>
      {error && <div>{error}</div>}
      <PreviousSearches
        savedResults={savedResults}
        deletePost={deletePost}
      />
    </div>
  );
};

export default FavoritesPage;
