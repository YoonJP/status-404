import React, { Component } from 'react';
import {withUser} from '../context/UserContext';
import MainView from '../components/Main/MainView';
import Header from '../components/Main/Header';
import UserModal from '../components/Main/UserModal';
import AddressSearch from "../components/AddressSearch/AddressSearch";

class MainContainer extends Component {
    static defaultProps = {
        // user 정보, 유저 정보 없을시 null 로 기본값 설정
        user : null,
    }
    state = {
        // 모달 활성화 여부
        show: false,
        addressSearchShow: false
    }

  handleUserModal = () => {
    this.setState({ show: !this.state.show });
  };

  handleAddressSearch = () => {
    this.setState({ addressSearchShow: !this.state.addressSearchShow });
  };

  render() {
    const { show, addressSearchShow } = this.state;
    const { user, address } = this.props; // <=== UserContext 에 작성된 상태가 props로 전달됩니다.
    return (
      <React.Fragment>
        <UserModal
          user={user}
          onUserModal={this.handleUserModal}
          showModal={show}
        />
        <Header
          address={address}
          onUserModal={this.handleUserModal}
          onAddressSearch={this.handleAddressSearch}
        />
        <AddressSearch
          show={addressSearchShow}
          onAddressSearch={this.handleAddressSearch}
        />
        <MainView />
      </React.Fragment>
    );
  }
}

export default withUser(MainContainer);
