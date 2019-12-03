import React from 'react';
import Link from 'next/link'
import '../../styles/main.scss'

class Header extends React.Component {

    render() {
        //debugger
        // const title = this.props.title;
        return (
            <React.Fragment>   
                <p className="customClass">I am a p</p>
                <p className="customClassFromFile">I am a p</p>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/about">
                    <a>About</a>
                </Link>
                <Link href="/portfolios">
                    <a>Portfolios</a>
                </Link>
                <Link href="/blogs">
                    <a>Blogs</a>
                </Link>
                <Link href="/cv">
                    <a>CV</a>
                </Link>
                <style jsx>{`
                    a {
                        font-size: 20px;
                    }
                    .customClass {
                        color: green;
                    }                  
                `}</style>
                <style global jsx>{`
                    body {
                        // background: black;
                    }
                `}</style>
            </React.Fragment>
        )
    }
}

export default Header;