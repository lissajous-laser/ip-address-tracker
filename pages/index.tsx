import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {Rubik} from '@next/font/google';
import arrowRight from '../public/images/icon-arrow.svg';
import bgImg from '../public/images/pattern-bg.png';
import sty from '../styles/Home.module.scss';
import React, {useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {QueryResult} from '../resources/types';


const rubik = Rubik({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'block', 
});



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
    const domainNameRe: RegExp
      = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    const ipifyApiAddr = 'https://geo.ipify.org/api/v2/country,city';
    const apiKey = 'at_eGGETT5lnXLxPtBt1hr0FoS3yyWui';
    let getUrl: string;

    if (domainNameRe.test(sanitisedInput)) {
      getUrl = `${ipifyApiAddr}?apiKey=${apiKey}&domain=${sanitisedInput}`;
    } else {
      getUrl = `${ipifyApiAddr}?apiKey=${apiKey}&ipAddress=${sanitisedInput}`;
    }

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
      console.log(JSON.stringify(jsonResponse));
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
              <article className={sty.stat}>
                <h2 className={sty.h2}>IP ADDRESS</h2>
                <div className={sty.value}>{queryResult.ip}</div>
              </article>
              <div className={sty.separatorLn}></div>
              <article className={sty.stat}>
                <h2 className={sty.h2}>LOCATION</h2>
                <div className={sty.value}>
                  <div>{queryResult.city},&nbsp;</div>
                  <div>{queryResult.region} {queryResult.postalCode}</div>
                </div>
              </article>
              <div className={sty.separatorLnMid}></div>
            </div>
            <div className={sty.panelRight}>
              <article className={sty.stat}>
                <h2 className={sty.h2}>TIMEZONE</h2>
                <div className={sty.value}>UTC {queryResult.timezone}</div>
              </article>
              <div className={sty.separatorLn}></div>
              <article className={sty.stat}>
                <h2 className={sty.h2}>ISP</h2>
                <div className={sty.value}>{queryResult.isp}</div>
                
              </article>
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
