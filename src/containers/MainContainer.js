import React, { Component } from 'react';
import {withUser} from '../context/UserContext';
import MainView from '../components/Main/MainView';
import Header from '../components/Main/Header';
import UserModal from '../components/Main/UserModal';
import axios from 'axios';

const apiKey = '1173586d003c2973d03c551fc45e438f'; // 강산이꺼니까 막쓰지마샘

const api = axios.create();

api.interceptors.request.use(function(config) {
    if (apiKey) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = 'KakaoAK ' + apiKey;
    }
    return config;
});

class MainContainer extends Component {
    static defaultProps = {
        // user 정보, 유저 정보 없을시 null 로 기본값 설정
        user : null,
    }
    constructor(props){
        super(props);
        this.state = {
            // 모달 활성화 여부
            show: false,
            myposition: null
        }
    }
    async componentDidMount(){
        const {myposition} = this.state;
        // 브라우저 지오로케이션에서 현재 좌표값 가져오기
        
        await window.navigator.geolocation.getCurrentPosition( (position) => {
            this.setState({
                myposition: position.coords
            });
            
        });
        
        console.log(myposition);
    }

    async componentDidUpdate(){
        if(this.state.myposition){
            const {data} = await api.get('https://dapi.kakao.com//v2/local/geo/coord2address.json',{
                params: {
                    x: this.state.myposition.longitude,
                    y: this.state.myposition.latitude,
                    input_coord: 'WGS84'
                }
            });
            console.log(data);
        }
    }

    handleUserModal = () => {
        console.log(this.state.show);
        this.setState({ show: !this.state.show })
    }

    render() {
        const {show} = this.state;
        const {user} = this.props; // <=== UserContext 에 작성된 상태가 props로 전달됩니다.
        return (
            <React.Fragment>
            <UserModal 
                user={user}
                onUserModal={this.handleUserModal} showModal={show}
            />
            <Header 
                user={user}
                onUserModal={this.handleUserModal}
            />
            <MainView/>
            </React.Fragment>
        );
    }
}

export default withUser(MainContainer);