import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'

import axios from 'axios';

class Secret extends React.Component {

    // On initialise notre state
    state = {
        secretData: []
    }

    async componentDidMount() {

        const res = await axios.get('api/v1/secret');
        console.log(res)
        const secretData = res.data

        this.setState({
            secretData
        });
    }

    displaySecretData() {
        const { secretData } = this.state;

        if ( secretData && secretData.length > 0) {
            return secretData.map((data, index) => {
            return (
                <div key={index}>
                <p> { data.title }</p>
                <p> { data.description }</p>
                </div>
            )
            })
        }

        return null;
    }

    static getInitialProps() {
        const superSecretValue =  'Super secret value';
        
        return { superSecretValue };
    }

    render() {
        const { superSecretValue } = this.props;

        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>I am Secret page</h1>
                    <h2> {superSecretValue} </h2>
                    { this.displaySecretData() }
                </BasePage>
            </BaseLayout>            
        )
    }
}

export default withAuth(Secret);