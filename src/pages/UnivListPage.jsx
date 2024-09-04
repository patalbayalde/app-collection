import React, { useState, createContext, useMemo, useReducer, useEffect } from 'react';
import BasicSearch from '../components/BasicSearch';
import SearchWithoutBtn from '../components/SearchWithoutBtn';
import List from '../components/List';
import { initialState, actionTypes, reducer } from '../reducers/univ-list.reducer';
import univListService from '../services/univ-list.service';
import ClipLoader from 'react-spinners/ClipLoader';
import useDebounce from '../hooks/useDebounce';

const UnivListContext = createContext(null);
const UnivFilterContext = createContext(null);

export default function UnivListPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [country, setCountry] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const debouncedText = useDebounce(filter, 1000);

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
      list: filteredList,
    };
  }, [country, filteredList]);

  const filterValues = useMemo(() => {
    return {
      searchValue: [filter, setFilter],
    };
  }, [filter]);

  useEffect(() => {
    const filteredArray = state.data.filter((item) => {
      return item.name.toLowerCase().includes(debouncedText.trim().toLowerCase());
    });

    setFilteredList(filteredArray);
  }, [debouncedText, state.data]);

  return (
    <UnivListContext.Provider value={values}>
      <UnivFilterContext.Provider value={filterValues}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p>Univ List Page</p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div>
              <p style={{ margin: 0 }}>Enter country</p>
              <BasicSearch context={UnivListContext} />
            </div>
            <div>
              <p style={{ margin: '0px' }}>Filter Universities</p>
              <SearchWithoutBtn context={UnivFilterContext} />
            </div>
          </div>

          <div
            style={{
              flex: 1,
              width: '40%',
            }}
          >
            {!state.loading && <List context={UnivListContext} />}
          </div>

          {state.loading && <ClipLoader loading={state.loading} size={50} />}
        </div>
      </UnivFilterContext.Provider>
    </UnivListContext.Provider>
  );
}
