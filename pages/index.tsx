import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {Rubik} from '@next/font/google';
import arrowRight from '../public/images/icon-arrow.svg';
import bgImg from '../public/images/pattern-bg.png';
import sty from '../styles/Home.module.scss';
import React, {useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'


const rubik = Rubik({
  weight: ['400', '500', '700']
});

type query = {
  ipAddr: string,
  location: string,
  tz: string,
  isp: string,

}

export default function Home() {
  const [txtInputState, setTxtInputState] = useState('');
  const [query, setQuery] = useState({})

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sanitisedInput = txtInputState.trim();
    const domainNameRe: RegExp
      = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    const ipifyApiAddr = 'https://geo.ipify.org/api/v2/country';
    const apiKey = 'at_eGGETT5lnXLxPtBt1hr0FoS3yyWui';
    let getUrl: string;
    if (domainNameRe.test(sanitisedInput)) {
      getUrl = `${ipifyApiAddr}?apiKey=${apiKey}&domain=${sanitisedInput}`;
    } else {
      getUrl = `${ipifyApiAddr}?apiKey=${apiKey}&ipAddress=${sanitisedInput}`;
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
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
          integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14="
          crossOrigin=""
        />
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
              pattern='hello'
              placeholder='Search for any IP address or domain'
              onChange={inputChangeHandler}
            />
            <button className={sty.button}>
              <Image src={arrowRight} alt={'Arrow'}/>
            </button>
          </form>
          <div className={sty.panelFull}>
            <div className={sty.panelLeft}>
              <article className={sty.stat}>
                <h2 className={sty.h2}>IP ADDRESS</h2>
                <div className={sty.value}>192.212.174.101</div>
              </article>
              <div className={sty.separatorLn}></div>
              <article className={sty.stat}>
                <h2 className={sty.h2}>LOCATION</h2>
                <div className={sty.value}>
                  <div>Brooklyn, NY&nbsp;</div>
                  <div>10001</div>
                </div>
              </article>
              <div className={sty.separatorLnMid}></div>
            </div>
            <div className={sty.panelRight}>
              <article className={sty.stat}>
                <h2 className={sty.h2}>TIMEZONE</h2>
                <div className={sty.value}>UTC -05:00</div>       
              </article>
              <div className={sty.separatorLn}></div>
              <article className={sty.stat}>
                <h2 className={sty.h2}>ISP</h2>
                <div className={sty.value}>
                  <div>SpaceX&nbsp;</div>
                  <div>Starlink</div>
                </div>
                
              </article>
            </div>
          </div>
        </div>
        <div className={sty.layer0}>
          <Image className={sty.bgImg} src={bgImg} alt='Decorative map background'/>
          <Map/>
        </div>
      </main>
    </div>
  );
}
