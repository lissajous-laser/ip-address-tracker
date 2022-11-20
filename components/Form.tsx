import Image from 'next/image';
import React, {useState} from 'react';
import arrowRight from '../public/images/icon-arrow.svg';
import {domainNameRe} from '../resources/constants';
import {QueryResult} from '../resources/types';
import sty from '../styles/Form.module.scss';

export default function Form({setQueryResult}:
  {setQueryResult: React.Dispatch<React.SetStateAction<QueryResult>>}
) {

  const [txtInputState, setTxtInputState] = useState('');

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtInputState(event.target.value);
  }

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sanitisedInput = txtInputState.trim();
    const ipifyApiAddr = 'https://geo.ipify.org/api/v2/country,city';
    const apiKey = 'at_eGGETT5lnXLxPtBt1hr0FoS3yyWui';
    let getUrl: string;

    if (domainNameRe.test(sanitisedInput)) {
      getUrl = `${ipifyApiAddr}?apiKey=${apiKey}&domain=${sanitisedInput}`;
    } else {
      getUrl = `${ipifyApiAddr}?apiKey=${apiKey}&ipAddress=${sanitisedInput}`;
    }

    try {
      const response = await fetch(getUrl);
      if (response.ok) {
        const jsonResponse = await response.json();

        setQueryResult({
          ip: jsonResponse.ip,
          region: jsonResponse.location.region,
          city: jsonResponse.location.city,
          lat: jsonResponse.location.lat,
          lng: jsonResponse.location.lng,
          postalCode: jsonResponse.location.postalCode,
          timezone: jsonResponse.location.timezone,
          isp: jsonResponse.isp        
        });
        
        setTxtInputState('');
      }
    } catch (e) {
    
    }
  }

  return (
    <form className={sty.inputAndButton} onSubmit={formSubmitHandler}>
      <input
        className={sty.txtInput}
        placeholder='Search for any IP address or domain'
        onChange={inputChangeHandler}
        value={txtInputState}
      />
      <button className={sty.button}>
        <Image src={arrowRight} alt={'Arrow'}/>
      </button>
  </form>
  );
}