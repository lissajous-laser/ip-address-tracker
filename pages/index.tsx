import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import React, {useState} from 'react';
import Form from '../components/Form';
import Stat from '../components/Stat';
import arrowRight from '../public/images/icon-arrow.svg';
import bgImg from '../public/images/pattern-bg.png';
import {domainNameRe, gnuDomain} from '../resources/constants';
import {rubik} from '../resources/fonts';
import { apiCall } from '../resources/functions';
import {QueryResult} from '../resources/types';
import sty from '../styles/Home.module.scss';


export default function Home() {
  const [queryResult, setQueryResult] = useState<QueryResult>(gnuDomain);

  const Map = dynamic(() =>
    import('../components/Map'), {ssr: false}
  );

  return (
    <div className={rubik.className}>
      <Head>
        <title>IP Address Tracker</title>
        <link rel="icon" href="/favicon-32x32.png"/>

      </Head>
      <main className={sty.contentContainer}> 
        {/* .layer1 absolutely positioned, displayed on top
        of backgound image and map */}
        <div className={sty.layer1}> 
          <h1 className={sty.h1}>
            IP Address Tracker
          </h1>
          <Form
            setQueryResult={setQueryResult}
            apiCall={apiCall}
          />
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
          <div className={sty.mapWrapper}>
            <Map lat={queryResult.lat} lng={queryResult.lng}/>
          </div>
        </div>
      </main>
    </div>
  );
}
