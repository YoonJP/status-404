import React, { Component } from "react";
import styles from "./AddressSearchResult.module.scss";
import classNames from "classnames/bind";
// import SVG
import { ReactComponent as MagnifyingGlass } from "../../img/search.svg";
import { ReactComponent as Crosshair } from "../../img/crosshair.svg";
import { ReactComponent as Ex } from "../../img/x.svg";
import { ReactComponent as BackBtn } from "../../svg/arrow-left.svg";

const cx = classNames.bind(styles);

export default class AddressSearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      searchResult: []
    };
  }

  handleUserInput = e => {
    const userInput = e.target.value;
    this.setState({
      userInput
    });
  };

  render() {
    const { show, onAddressSearch, getAddress, onBackBtn } = this.props;
    const { userInput, searchResult } = this.state;
    return (
      <>
        <div className={cx("container")}>
          <div className={cx("formContainer")}>
            <button className={cx("backBtn")} onClick={onBackBtn}>
              <BackBtn />
            </button>
            <h1 className={cx("header")}>배달 받을 주소</h1>
            <div className={cx("addressSearchForm")}>
              <input
                autoComplete="off"
                onChange={e => this.handleUserInput(e)}
                value={userInput}
                className={cx("addressSearchInput")}
                label="주소검색"
                type="search"
                name="address"
                placeholder="예) 배민동12-3 또는 배민아파트"
              />
              <button
                className={cx("addressSearchButton")}
                onClick={getAddress}
              >
                <div className={cx("listContainer")}>
                  <h2 className={cx("listTitle")}>검색 결과</h2>
                  <ul className={cx("recentAddress")}>
                    {searchResult.map(s => (
                      <li key={s.id} className={cx("listItem")}>
                        <div className={cx("place")}>{s.place_name}</div>
                        <div className={cx("address")}>{s.address_name}</div>
                        <div className={cx("textContainer")}>
                          <div className={cx("box")}>도로명</div>
                          <div className={cx("road")}>
                            {s.road_address_name}
                          </div>
                        </div>
                        <button className={cx("deleteButton")}>
                          <Ex />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <MagnifyingGlass />
              </button>
            </div>
          </div>
        </div>
        {/* <div className={cx("formContainer")}>
            <button className={cx("closeButton")} onClick={onAddressSearch}>
              <Ex />
            </button>
            <h1 className={cx("header")}>
              지번, 도로명, 건물명을
              <p>입력하세요</p>
            </h1>
            <div className={cx("addressSearchForm")}>
              <input
                autoComplete="off"
                onChange={e => this.handleUserInput(e)}
                value={userInput}
                className={cx("addressSearchInput")}
                label="주소검색"
                type="search"
                name="address"
                placeholder="예) 배민동12-3 또는 배민아파트"
              />
              <button
                className={cx("addressSearchButton")}
                onClick={() => getAddress(userInput)}
              >
                <MagnifyingGlass />
              </button>
            </div>
            <button className={cx("addressSettingButton")}>
              <Crosshair />
              <p>현 위치로 주소 설정</p>
            </button>
          </div>
          <div className={cx("listContainer")}>
            <h2 className={cx("listTitle")}>최근 주소</h2>
            <ul className={cx("recentAddress")}>
              {searchResult.map(s => (
                <li key={s.id} className={cx("listItem")}>
                  <div className={cx("place")}>{s.place_name}</div>
                  <div className={cx("address")}>{s.address_name}</div>
                  <div className={cx("textContainer")}>
                    <div className={cx("box")}>도로명</div>
                    <div className={cx("road")}>{s.road_address_name}</div>
                  </div>
                  <button className={cx("deleteButton")}>
                    <Ex />
                  </button>
                </li>
              ))}
            </ul>
          </div> */}
      </>
    );
  }
}
