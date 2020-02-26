import React from 'react';
import Header from '../shared/Header';
import Head from 'next/head';

const BaseLayout = (props) => {
  const { className, children, isAuthenticated, user, isSiteOwner, cannonical } = props;
  const headerType = props.headerType || '';
  const title = props.title || 'Johan Ibtaten - Développeur Front-End, UX / UI designer - Portfolio';
  return (
    <React.Fragment>
      <Head>
        { /*
          <script src="/static/js/mconsole.js"></script>
        */ } 
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        
        <meta name="description" content="Je m'appelle Johan Ibtaten, je suis développeur Front-End et UX / UI designer expérimenté. J'habite à Paris." />
        <meta name="keywords" content="Johan Ibtaten portfolio, Johan Ibtaten développeur, Johan Ibtaten design, Johan Ibtaten programmation"/>
        
        <meta property="og:title" content="Johan Ibtaten - Développeur Front-End, UX / UI designer" />
        <meta property="og:locale" content="en_EU" />
        <meta property="og:url" content={`${process.env.BASE_URL}`}/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="Je m'appelle Johan Ibtaten et je suis développeur Front-End et UX / UI designer expérimenté."/>
        
        {cannonical && <link rel="cannonical" href={`${process.env.BASE_URL}${cannonical}`}/>}

        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="manifest" href="/static/site.webmanifest" />
        <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/static/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff"></meta>

        <script type="text/javascript" src="/static/js/masonry/masonry.pkgd.min.js"></script>
        <script type="text/javascript" src="/static/js/memory/memory.js"></script>
                
      </Head>
      <div className="layout-container" >
        <Header className={`port-nav-default ${headerType}`}
                isAuthenticated={isAuthenticated}
                user={user}
                isSiteOwner={isSiteOwner}/>
        <main className={`cover ${className}`}>
          <div className="wrapper">
            {children}
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}

export default BaseLayout;