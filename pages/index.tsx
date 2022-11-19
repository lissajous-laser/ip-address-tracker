import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import React, {useState} from 'react';
import Stat from '../components/Stat';
import arrowRight from '../public/images/icon-arrow.svg';
import bgImg from '../public/images/pattern-bg.png';
import {domainNameRe} from '../resources/constants';
import {rubik} from '../resources/fonts';
import {QueryResult} from '../resources/types';
import sty from '../styles/Home.module.scss';


export default function Home() {
  const [txtInputState, setTxtInputState] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult>({
    ip: '209.51.188.116',
    region: 'Florida',
    city: 'Sarasota',
    lat: 27.33643,
    lng: -82.53065,
    postalCode: '34230',
    timezone: '-05:00',
    isp: 'Hurricane Electric LLC'
  })

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

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxtInputState(event.target.value);
  }

  const Map = dynamic(() =>
    import('../components/Map'), {ssr: false}
  );

  return (
    <div className={sty.container}>
      <Head>
        <title>IP Address Tracker</title>
        <link rel="icon" href="/favicon-32x32.png"/>

      </Head>
      <main className={rubik.className}> 
        {/* Absolutely positioned, displayed on top of 
        backgound image and map */}
        <div className={sty.layer1}> 
          <h1 className={sty.h1}>
            IP Address Tracker
          </h1>
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
          <div className={sty.panelFull}>
            <div className={sty.panelLeft}>
              <Stat name='IP ADDRESS' value={queryResult.ip}/>
              <div className={sty.separatorLn}/>
              <Stat
                name='LOCATION' 
                value={
                  queryResult.city + ', '
                  + queryResult.region}
              />
              <div className={sty.separatorLnMid}/>
            </div>
            <div className={sty.panelRight}>
              <Stat name='TIMEZONE' value={'UTC ' + queryResult.timezone}/>
              <div className={sty.separatorLn}/>
              <Stat name='ISP' value={queryResult.isp}/>
            </div>
          </div>
        </div>
        <div className={sty.layer0}>
          <Image
            className={sty.bgImg}
            src={bgImg}
            alt='Decorative map background'
          />
          <Map lat={queryResult.lat} lng={queryResult.lng}/>
        </div>
      </main>
    </div>
  );
}
