import React, { useState, createContext, useMemo, useReducer } from 'react';
import BasicSearch from '../components/BasicSearch';
import List from '../components/List';
import { initialState, actionTypes, reducer } from '../reducers/univ-list.reducer';
import univListService from '../services/univ-list.service';
import ClipLoader from 'react-spinners/ClipLoader';

const UnivListContext = createContext(null);

export default function UnivListPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [country, setCountry] = useState('');

  const handleSearchCountry = async () => {
    dispatch({ type: actionTypes.SEARCH });

    try {
      const data = await univListService.getList({
        params: { country },
      });

      dispatch({ type: actionTypes.SEARCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: actionTypes.SEARCH_FAIL, payload: error.message });
    }
  };

  const values = useMemo(() => {
    return {
      searchValue: [country, setCountry, handleSearchCountry],
      list: state.data,
    };
  }, [country, state.data]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>Univ List Page</p>
      <UnivListContext.Provider value={values}>
        <BasicSearch context={UnivListContext} />
        {!state.loading && <List context={UnivListContext} />}
      </UnivListContext.Provider>
      {state.loading && <ClipLoader loading={state.loading} size={50} />}
    </div>
  );
}
