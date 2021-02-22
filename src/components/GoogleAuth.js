import React from 'react';

class GoogleAuth extends React.Component {

    state = {isSignedIn:null};
    
    componentDidMount() {
        window.gapi.load('client:auth2', ()=> {
            window.gapi.client.init({
                clientId:'939674507166-344cd8c16kavcoq6m8lf05p2r2uim6dr.apps.googleusercontent.com',
                scope:'email'
            }).then (()=> {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()})
                this.auth.isSignedIn.listen(this.onAuthChange);
            }) ;
        });        
    }

    onAuthChange = () => {
        this.setState({isSignedIn:this.auth.isSignedIn.get()})
    };

    rendeAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
            <button className="ui red google button">
                <i className="google icon"></i>
                Sign in with Google
            </button>
                )
        }
    }
    
    render() {
        return (
            <div>
                {this.rendeAuthButton()}
            </div>
        )
    }
}

export default GoogleAuth