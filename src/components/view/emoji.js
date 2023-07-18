import React, { useState, useEffect } from 'react';
import getEmojis from "../providers";
import Search from './Search';
import './emoji.css';

export default function Emoji() {
    const [allEmojis, setAllEmojis] = useState([])
    const [someEmojis, setSomeEmojis] = useState([])
    const [searchString, setSearchString] = useState('')
    const [categoreyString, setCategoreyString] = useState('')

    const getData = async () => {
        const response = await getEmojis();
        setAllEmojis(response);
        setSomeEmojis(response)
    }

    useEffect(() => {
        // Update the state using the browser API
        getData();
    }, []);

    // code-conversion
    const removeUnicodePrefix = (unicodeString) => {
        return unicodeString.replace("U+", "");
    };

    // filtering data with search string
    const filterArr = (value) => {
        const arr = value.length > 2 ? allEmojis.filter(x => x.name.includes(value)) : allEmojis
        setSomeEmojis(arr)
        return arr
    }

    // filtering data with categorey string
    const filterArr_withCategorey = (value) => {
        const arr = value.length > 2 ? allEmojis.filter(x => x.category.includes(value)) : allEmojis
        setSomeEmojis(arr)
        return arr
    }

    return (
        <section>
            <h2>Start typing to see some magic happen!</h2>
            <h1>Find your Emoji</h1>
            <br />
            <section className='filter-wrapper'>
            <Search
                placeholder="Filter emoji list"
                value={searchString}
                onChangeHandler={(value) => {
                    setSearchString(value)
                    filterArr(value)
                }}
            />
            <p>or</p>
            <Search
                placeholder="Filter by categorey"
                value={categoreyString}
                onChangeHandler={(value) => {
                    setCategoreyString(value)
                    filterArr_withCategorey(value)
                }}
            />
            </section>
            <br />
            <section className='emoji-wrapper'>
                {
                    someEmojis.length > 0 && someEmojis.map((anEmoji, key) =>
                        <div className='each-emoji-wrapper' key={key}>
                            <div className='actual-emoji' role={"img"} aria-label={anEmoji.name}>
                                {String.fromCodePoint(parseInt(removeUnicodePrefix(anEmoji.unicode[0]), 16))}
                            </div>
                            <p className='emoji-name'>{anEmoji.name}</p>
                        </div>)
                }
            </section>
        </section>
    );
}
