import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react';

import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

// import './css/searchbar.css';
import GetCompanyData from './GetCompanyData';
import Chart1 from './Chart1';

import { Link, Routes, Route } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';


const Home2 = () => {
    const { searchParam } = useParams(); 
    let ticker = searchParam.toString() || "";

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [inputValue, setInputValue] = useState( ticker);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const maxSuggestionsToShow = 50;
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
    `;

    const fetchController = useRef(null); 

    useEffect(() => {
        // Set the input value with the URL parameter value when the component mounts
        if(searchParam!='home'){
            setInputValue(searchParam );
            handleSubmit({ preventDefault: () => {} });
        }
    }, [searchParam]);



    const handleInputChange = async (event) => {
        window.localStorage.clear();
        setFormSubmitted(false);
        const value = event.target.value;
        setInputValue(value);
        // console.log(event.target.value)
        
        // Reset suggestions state for each input change
        setSuggestions([]);

        // Set loading state to true
        setLoading(true);
        if (event.target.value === "") {
            // console.log("Input value is an empty string");
            setLoading(false);
        }
        // Cancel the previous fetch request if it exists
        if (fetchController.current) {
            fetchController.current.abort();
        }


        // Create a new AbortController
        fetchController.current = new AbortController();

        try {
            const companySymbol = value;
            const signal = fetchController.current.signal;

            // Perform the fetch request
            const response = await fetch(`https://web3-571-ass3-darsh.uc.r.appspot.com/auto_complete/${companySymbol}`, { signal });
            const data = await response.json();

            setSuggestions(
                (data.finnhubData && data.finnhubData.result || [])
                  .filter(item => item && !item.displaySymbol.includes('.')) // Exclude items with '.'
                  .map(item => `${item.displaySymbol} | ${item.description}`)
              );
              if (suggestions != null) {
                setLoading(false);
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error fetching data:', error);
            }
        } finally {
            // Do not set loading to false here. Keep it true until new data arrives.
        }
    };


    const handleSelectSuggestion = (selectedValue) => {
        const companySymbol = selectedValue.split(' | ')[0];
        setSuggestions([]);
        setInputValue(companySymbol);
        setFormSubmitted(true);
        setLoading(false);

       
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        // console.log("HOME 2.... TICKER LOCAL ", inputValue);
        window.localStorage.setItem('t_name', JSON.stringify(inputValue));
        setSuggestions([]);
        //navigate(`/search/${inputValue}`);
        setFormSubmitted(true);
        setLoading(false);
    };

    return (
        <div className="bodydiv">
        {/* <div id="middle_stock_class" className='fs-3'>STOCK SEARCH</div> */}
        <div id="" className='fs-2 pt-4 pb-3'>STOCK SEARCH</div>
        <form onSubmit={handleSubmit} className='d-flex justify-content-center '>
            <div className="d-flex flex-column col-lg-4  col-10  ">
                <div>
                    <input
                        placeholder="Enter stock ticker symbol"
                        className="p-1 ps-4 col-lg-10 col-12 border border-4 rounded-5 border-primary"
                        style={{ border: 'none', outline: 'none', borderColor: 'rgb(3, 3, 169)' }}
                        required
                        value={inputValue}
                        onChange={handleInputChange}
                    ></input>
                    <button className="me-1 Bootstrap_search" style={{ marginLeft: "-82px" }} type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <button className="ms-1 Bootstrap_search" type="button" 
                        onClick={() => { setSuggestions([]); setInputValue(""); setFormSubmitted(false); setLoading(false); navigate(`/search/home`); window.localStorage.clear(); }}>
                        &#10006;
                    </button>
                </div>

                <div className="list-group-container" style={{ marginTop: '-10px', marginLeft: '20px' }}>
                    {!formSubmitted && loading && (
                        <div className="list-group ps-lg-5 ps-1" style={{ border: 'none', textAlign: 'left' }}>
                            <div className="list-group-item col-9" style={{ border: 'none', maxWidth: '300px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                                <div className="d-flex justify-content-left align-items-left">
                                    <div className="spinner-border text-primary m-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!formSubmitted && inputValue && suggestions.length > 0 && (
                        <div className="list-group ps-lg-5 ps-1" style={{ border: 'none', textAlign: 'left' }}>
                            <div className={`list-group-item${suggestions.length > 6 ? ' overflow-auto' : ''} col-9 `} style={{ border: 'none', maxHeight: '250px', maxWidth: '280px', borderRadius: '0', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                                <ul className="list-group" style={{ border: 'none', overflowY: 'auto' }}>
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index} className='list-group-item border-0 ps-0 fs-9 pe-0' onClick={() => handleSelectSuggestion(suggestion)} style={{ border: 'none', width: '100%' }}>
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>





            </div>
        </form>

        {/* Require changes */}
        {formSubmitted && (
            <div id="x" style={{paddingTop: '5vh'}}>

                <GetCompanyData selectedValue={inputValue} />
            </div>
        )}
        </div>
    );
};

export default Home2;
