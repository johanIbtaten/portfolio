import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout'
import BasePage from '../components/BasePage'
import withAuth from '../components/hoc/withAuth'

import { getSecretData } from '../actions';

class Secret extends React.Component {

    static async getInitialProps({req}) {
        const anotherSecretData =  await getSecretData(req);

        return { anotherSecretData };
    }

    // On initialise notre state
    state = {
        secretData: []
    }

    async componentDidMount() {
        const secretData = await getSecretData();

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

    render() {
        const { anotherSecretData } = this.props;
        debugger
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>I am Secret page</h1>
                    <h2> {anotherSecretData[0].title} </h2>
                    { this.displaySecretData() }
                </BasePage>
            </BaseLayout>            
        )
    }
}

export default withAuth(Secret);