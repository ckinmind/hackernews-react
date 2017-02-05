import React from 'react';
import Spinner from '../spinner';
import $ from 'jquery';

class Profile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            about: "",
            created: "",
            karma: "",
            isLoading: true
        };
    }

    hideLoading() {
        this.setState({ isLoading: false });
    }

    componentDidMount() {
        /**
         *  该页面的路由规则是： <Route path="user/:id" component={Profile} />
         *  所以可以在params中获取到id 参数，这里通过this.props.params.id
         *
         * */
        let id = this.props.params.id;
        let source = 'https://hacker-news.firebaseio.com/v0/user/' + id + '.json';

        $.get(source, function (user) {
            this.hideLoading();
            if (user) {
                this.setState({
                    user: user.id,
                    about: user.about,
                    created: user.created,
                    karma: user.karma
                });
            }

        }.bind(this));
    }

    render() {
        return (
            <div className="content profile-content">
                <div className={this.state.isLoading ? 'spinner-container': 'hide'}>
                    <Spinner />
                </div>

                <div className={this.state.isLoading ? 'hide': 'content-added'}>
                    <h1>
                        User : <span> { this.state.user }</span>
                    </h1>
                    <h1 className={this.state.about ? '': 'hide'}>
                        About : <span>{ this.state.about }</span>
                    </h1>
                    <h1>Created :
                        <span> { this.state.created } </span>
                    </h1>
                    <h1>
                        Karma : <span> { this.state.karma ? this.state.karma : 0 } </span>
                    </h1>
                </div>
            </div>
        )
    }
}


export default Profile;