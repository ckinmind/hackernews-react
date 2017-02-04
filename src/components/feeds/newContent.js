import React from 'react';
import Spinner from '../spinner';
import { Link } from 'react-router';
import $ from 'jquery';
import {convertTime} from '../../util/util.js';

const pagination = 10;

class NewContent extends React.Component{

    constructor(props){
        super(props);
        this.jsonData = [];
        this.isUnMount = false;
        this.state = {
            newStories: [],
            isLoading: true,
            isLoadingMore: false
        };
    }

    hideLoader() {
        this.setState({
            isLoading: false
        });
    }

    componentDidMount() {
        let sourceUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json';
        $.get(sourceUrl, function (response) {

            /** 这也是必须的，因为后面执行的getContentJson()中的hideLoader方法中也有setState,如果页面切换太快的，也会导致报错*/
            if(this.isUnMount){
                return;
            }

            if (response && response.length == 0) {
                this.hideLoader();
                return;
            }

            this.jsonData = response;
            let startIndex = 0;
            let endIndex = startIndex + pagination;
            this.getContentJson(startIndex, endIndex, false);
        }.bind(this));
    }

    componentWillUnmount(){
        this.isUnMount = true;
        $(window).unbind('scroll');
    }

    getContentJson(startIndex, endIndex, isLoadingMore) {

        for(let i = startIndex; i <= endIndex; i++) {
            if (i == endIndex) {

               this.hideLoader();

                if (isLoadingMore) {
                    this.setState({ isLoadingMore: false });
                }
                this.loadMore(endIndex);
                return false;
            }
            /** 传入额外的i，即代表当前id的索引*/
            this.getContentData(this.jsonData[i], i);
        }
    }

    getContentData(id, idIndex) {
        if(idIndex > this.jsonData.length-1){
            return ;
        }

        let contentUrl = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json';
        $.get(contentUrl, function (response) {

            if(this.isUnMount){
                return;
            }

            let domain = response.url ? response.url.split(':')[1].split('//')[1].split('/')[0] : '';
            response.domain = domain;
            this.setState({newStories : this.state.newStories.concat(response)});
        }.bind(this));
    }

    loadMore(startIndex) {

        $(window).unbind('scroll');

        /** 新增：json中的数据项都请求完毕后不需要再监听scroll*/
        if(startIndex > this.jsonData.length-1){
            return false;
        }

        $(window).bind('scroll', function () {

            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
               let endIndex = startIndex + pagination;

                this.setState({isLoadingMore : true}); //To show loader at the bottom

                this.getContentJson(startIndex, endIndex, true);
            }
        }.bind(this));
    }


    getNewStories(){
        return this.state.newStories.map((response, index) => {
            let searchQuery = 'https://www.google.co.in/search?q=' + response.title;
            return (
                <div key={index}>
                    <div className="content">
                        <a className="title" target="_blank" href={response.url}>{response.title} </a>
                        <div className={response.domain ? 'domain': 'hide'}> (<a href={'http://' + response.domain} title="Domain">{response.domain}</a>)</div>

                        <div className="bottom-content">
                            <span>{response.score} {(response.score > 1) ? ' points' : ' point'} </span>
                            <span>by<Link className="author" to={'/user/' + response.by}>{response.by}</Link></span>
                            <span> | {convertTime(response.time)} </span>
                            <a href={searchQuery} target="_blank" className="search-web"> | <span>web</span></a>
                        </div>
                    </div>
                </div>
            )
        }, this);
    }

    render() {

        return (
            <div className="content-container">
                <div className={this.state.isLoading ? '': 'hide'}>
                    <Spinner />
                </div>

                { this.getNewStories() }

                <div className={ this.state.isLoadingMore ? 'mtop50' : 'hide'}>
                    <Spinner />
                </div>
            </div>
        )
    }
}

export default NewContent;