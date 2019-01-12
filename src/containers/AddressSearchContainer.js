import React, { Component } from "react";
import AddressSearchView from "../components/AddressSearch/AddressSearchView";
import AddressSearchResult from "../components/AddressSearch/AddressSearchResult";
import kakaoAPI from "../api/kakaoAPI";
// import mainAPI from "../api/mainAPI";
import { withUser } from "../context/UserContext";
import KakaoView from "../components/AddressSearch/KakaoView";
import { UiProvider } from "../context/UiContext";
import AddressSetting from "../components/AddressSearch/AddressSetting";

class AddressSearchContainer extends Component {
  constructor(props) {
    super(props);
    let addressHistory = [];
    if (localStorage.getItem("address")) {
      addressHistory = JSON.parse(localStorage.getItem("address"));
    }

    this.state = {
      page: "address-search",
      searchResult: [],
      userInput: "",
      recentAddress: addressHistory
    };

    // loading: false
  }

  handleUserInput = e => {
    const userInput = e.target.value;
    this.setState({
      userInput
    });
  };

  setUserInput = input => {
    this.setState({
      userInput: input
    });
  };

  handleSubmitBtn = () => {
    const { userInput, page } = this.state;
    if (userInput.length === 0) {
      alert("검색어를 입력하세요");
    } else if (userInput.length === 0 && page === "address-search-page") {
      alert("검색어를 입력하세요");
    } else {
      this.setState({
        page: "address-search-result"
      });
    }
  };

  getAddress = async userInput => {
    const { data } = await kakaoAPI.get(
      // 키워드(지번, 도로명, 건물명)로 검색, 설정값: 전국 단위(기준이되는 위치 설정은 아직 미구현)
      "https://dapi.kakao.com/v2/local/search/keyword.json",
      {
        params: {
          query: userInput,
          size: 15
        }
      }
    );
    const searchResult = data.documents;
    this.setState({
      searchResult
    });
  };

  handleBackBtn = () => {
    this.setState({
      page: "address-search"
    });
  };

  handleFinishBtn = id => {
    const { searchResult, recentAddress } = this.state;
    const index = searchResult.findIndex(item => item.id === id);
    this.state.recentAddress.unshift(searchResult[index]);
    localStorage.setItem("address", JSON.stringify(recentAddress));
    this.setState({
      page: "address-search"
    });
  };

  handleKakaoView = () => {
    this.setState({
      page: "kakao"
    });
  };

  handleAddressSetting = () => {
    this.setState({
      page: "address-setting"
    });
  };

  handleDeleteBtn = index => {
    const { recentAddress } = this.state;
    console.log(recentAddress);
    this.state.recentAddress.splice(index, 1);
    localStorage.setItem("address", JSON.stringify(recentAddress));
    this.setState({});
  };

  render() {
    const { searchResult, userInput, recentAddress } = this.state;
    const { onAddressSearch, show, address, createUserAddress } = this.props;
    return (
      <>
        <UiProvider>
          {this.state.page === "address-search" ? (
            <AddressSearchView
              onUserInput={e => this.handleUserInput(e)}
              onSubmitBtn={() => this.handleSubmitBtn()}
              getAddress={this.getAddress}
              onAddressSearch={onAddressSearch}
              show={show}
              recentAddress={recentAddress}
              address={address}
              onKakaoView={this.handleKakaoView}
              userInput={userInput}
              onDeleteBtn={e => this.handleDeleteBtn(e)}
              onAddressSetting={this.handleAddressSetting}
            />
          ) : this.state.page === "address-search-result" ? (
            <AddressSearchResult
              searchResult={searchResult}
              userInput={userInput}
              onSubmitBtn={() => this.handleSubmitBtn()}
              onUserInput={e => this.handleUserInput(e)}
              onBackBtn={index => this.handleBackBtn(index)}
              onFinishBtn={e => this.handleFinishBtn(e)}
              recentAddress={recentAddress}
              getAddress={this.getAddress}
              address={address}
            />
          ) : this.state.page === "kakao" ? (
            <KakaoView
              createUserAddress={createUserAddress}
              onBackBtn={this.handleBackBtn}
              setUserInput={this.setUserInput}
            />
          ) : this.state.page === "address-setting" ? (
            <AddressSetting
              onBackBtn={() => this.handleBackBtn()}
              onRefreshBtn={this.handleRefreshBtn}
              onAddressSetting={this.handleAddressSetting}
            />
          ) : null}
        </UiProvider>
      </>
    );
  }
}

export default withUser(AddressSearchContainer);
