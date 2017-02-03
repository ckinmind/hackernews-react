import React from 'react';
import Spinner from '../spinner';
import { Link } from 'react-router';
import $ from 'jquery';
import {convertTime} from '../../util/util.js';

const pagination = 10;

class JobsContent extends React.Component{

    constructor(props) {
        super(props);
        this.jsonData = [];
        this.state = {
            newStories: [],
            isLoading: true,
            isLoadingMore: false
        };
    }

    /** 隐藏加载状态 */
    hideLoader() {
        this.setState({isLoading: false});
    }

    /**
     * 备注：这里得到的jobstories的数据个数是未定的
     *  返回的数据类似：[13549604, 13548512, 13547601, 13546090, 13543852 ...]
     */
    componentDidMount() {
        const sourceUrl = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
        $.get(sourceUrl, function (response) {
            /** 如果返回数据为空，表示无数据，则隐藏加载动画*/
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

    getContentJson(startIndex, endIndex, isLoadingMore) {

        /** 根据jobstories中的id数据，请求每一个具体数据*/
        for(let i = startIndex; i <= endIndex; i++) {
            if (i == endIndex) {
                /** 当加载到10的时候（第一轮）隐藏加载动画，注意从0开始的*/
                this.hideLoader();

                /** 隐藏底部的加载动画，针对的是第二轮及以上加载，因为第一轮加载的时候isLoadingMore默认false*/
                if (isLoadingMore){
                    this.setState({ isLoadingMore: false });
                }

                this.loadMore(endIndex);
                return false;
            }
            /** 传入额外的i，即代表当前id的索引*/
            this.getContentData(this.jsonData[i], i);
        }
    }

    /**
     * 获取单条消息
     * Api: https://hacker-news.firebaseio.com/v0/item/{id}.json'
     */
    getContentData(id, idIndex) {
        /**
         * 处理无效请求
         * 注意这里要减去1个，因为索引是从0开始的
         **/
        if(idIndex > this.jsonData.length-1){
            return false;
        }
        let contentUrl = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json';
        $.get(contentUrl, function (response) {

            let domain = response.url ? response.url.split(':')[1].split('//')[1].split('/')[0] : '';
            response.domain = domain;
            this.setState({
                newStories : this.state.newStories.concat(response)
            });

        }.bind(this));
    }


    loadMore(startIndex) {

        $(window).unbind('scroll');
        /** 新增：json中的数据项都请求完毕后不需要再监听scroll，然后再去请求更多数据*/
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

    /**
     * 获取当前的条目信息
     */
    getNewStories(){
        return this.state.newStories.map((response, index) => {
            return (
                <div key={index}>
                    <div className="content">
                        <a className="title" target="_blank" href={response.url}>
                            {response.title}
                        </a>

                        <div className={response.domain ? 'domain': 'hide'}>
                            (<a href={'http://' + response.domain} title="Domain">{response.domain}</a>)
                        </div>

                        <div className="bottom-content">
                            <span>{response.score} {(response.score > 1) ? ' points' : ' point'} </span>
                            <span>by <Link className="author" to={'/user/' + response.by}>{response.by}</Link></span>
                            <span> | {convertTime(response.time)} </span>
                        </div>
                    </div>
                </div>
            )
        });
    }

    render() {

        return (
            <div className="content-container">
                <div className={this.state.isLoading ? '': 'hide'}>
                    <Spinner />
                </div>
                {this.getNewStories()}
                <div className={ this.state.isLoadingMore ? 'mtop50' : 'hide'}>
                    <Spinner />
                </div>
            </div>
        )
    }
}

export default JobsContent;