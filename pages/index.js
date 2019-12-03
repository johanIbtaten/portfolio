import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'

class Index extends React.Component {    
    static async getInitialProps() {
        console.log('I am getInitialProps');
        return {}
    }

    constructor(props) {
        super(props)
        this.state = {
            title: 'I am Index page'
        }
        console.log('constructor');
        
    }

    // static getDerivedStateFromProps() {
    //     console.log('getDerivedStateFromProps');
    // }
    

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
    
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    updateTitle() {
        this.setState({title: 'I am updated page' })
    }

    

    render() {
        console.log('render');
        //let array = [<div>1</div>, <div>2</div>]
        return (
            <BaseLayout>
                <h1>I am index page</h1>
                <h2> {this.state.title} </h2>
                <button onClick={() => this.updateTitle()}>Change title</button>
                { /* array */ }
            </BaseLayout>
        )
    }
}

export default Index;

// <Header title={'I am the header'}>
//     <h1>Header subtitle</h1>
// </Header>

// <button onClick={() => this.updateTitle()}>Change title</button>