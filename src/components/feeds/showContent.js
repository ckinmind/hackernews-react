import React from 'react';
import Spinner from '../spinner';
import { Link } from 'react-router';
import $ from 'jquery';
import {convertTime} from '../../util/util.js';

const pagination = 10;

class ShowContent  extends React.Component{

    constructor(props){
        super(props);
        this.jsonData = [];
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
        let sourceUrl = 'https://hacker-news.firebaseio.com/v0/showstories.json';
        $.get(sourceUrl, function (response) {
            if (response && response.length == 0) {
                this.hideLoader();
                return;
            }
            this.jsonData = response;

            /** 详细列出来*/
            let startIndex = 0;
            let endIndex = startIndex + pagination;
            this.getContentJson(startIndex, endIndex, false);
        }.bind(this));
    }

    /**
     * 获取所有showstories的json数据，类似[13553224, 13552376, 13558813, 13557421, 13543072, 13550176 ...]
     * @param startIndex     本轮加载的开始的序号
     * @param endIndex     本轮加载的开始的序号
     * @param isLoadingMore  底部的加载动画sign
     */
    getContentJson(startIndex, endIndex, isLoadingMore) {

        for(let i = startIndex; i <= endIndex; i++) {

            if (i == endIndex){
                /** 当加载到10的时候（第一轮）隐藏加载动画，注意从0开始的*/
                this.hideLoader();

                /** 隐藏底部的加载动画，针对的是第二轮及以上加载，因为第一轮加载的时候isLoadingMore默认false*/
                if (isLoadingMore) {
                    this.setState({ isLoadingMore: false });
                }

                /** 本轮加载完了才能进行下一轮的请求*/
                console.log('before loadmore');
                this.loadMore(endIndex);
                console.log('after loadmore');
                return false;
            }
            /** 传入额外的i，即代表当前id的索引*/
            this.getContentData(this.jsonData[i],i);
        }
    }

    /**
     * 根据条目id获取具体数据
     * @param id 条目的id
     * @param idIndex id的索引位置
     */
    getContentData(id, idIndex) {
        console.log('idIndex: '+ idIndex+' id: '+id);
        /** 注意这里要减去1个，因为索引是从0开始的*/
        if(idIndex > this.jsonData.length-1){
            console.log('超出了 '+idIndex);
            return false;
        }

        let contentUrl = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json';
        $.get(contentUrl, function (response) {

            /**
             * 一轮加载是10个，但是总的数目不是刚好是10的倍数，比如有63个，最后10个只能到第三个（第四个）
             * 这个时候请求也会发，但是肯定返回为空，下面的判断就是为了处理这种情况，到这个时候就是表示json中的所有都已经加载了
             * 此处逻辑可以优化，可以在请求前就判断出已经超出json中的数据范围，这样就不用发无用的请求, mark
             * 已解决，在上面加了判断
             */
            // if (response.length == 0) {
            //     this.hideLoader();
            //     return;
            // }
            console.log('idIndex: '+idIndex);
            let domain = response.url ? response.url.split(':')[1].split('//')[1].split('/')[0] : '';
            response.domain = domain;
            this.setState({newStories : this.state.newStories.concat(response)});
        }.bind(this));
    }

    /** 滚动条触底时触发再次加载
     * $(window).scrollTop() ：返回或设置匹配元素的滚动条的垂直位置
     * $(document).height() : 页面高度，随滚动条增加而增加
     * $(window).height() ： 一屏的高度，我笔记本恒为780px
     *
     * 当滚动条触底时： $(window).scrollTop() =  $(document).height() - $(window).height()
     * 也即： $(document).height() = $(window).height() +  $(window).scrollTop()
     */
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
       return this.state.newStories.map((response, index) =>
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
                            <span>by<Link onClick={this.changeMenu} className="author" to={'/user/' + response.by}>{response.by}</Link></span>
                            <span> | {convertTime(response.time)} </span>
                        </div>
                    </div>
                </div>
            );
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

module.exports = ShowContent;