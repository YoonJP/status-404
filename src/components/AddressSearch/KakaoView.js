import React, { Component } from "react";
import styles from "./KakaoView.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class KakaoView extends Component {
  constructor(props) {
    super(props);
    this.daumMap = React.createRef();

    this.state = {
      markedAddress: null,
      detailMode: false,
      detailAddress: ""
    };
  }

  componentDidMount() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }) => {
          this.initKakaoMap(latitude, longitude);
        }
      );
    } else {
      alert("geolocation을 사용할 수 없습니다.");
    }
  }

  initKakaoMap = (latitude, longitude) => {
    const stateController = this.stateController;
    const mapContainer = this.daumMap.current; // 지도를 표시할 div
    const mapOption = {
      center: new window.daum.maps.LatLng(latitude, longitude), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    const map = new window.daum.maps.Map(mapContainer, mapOption);
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new window.daum.maps.services.Geocoder();

    const marker = new window.daum.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter()
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    window.daum.maps.event.addListener(map, "click", function(mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === window.daum.maps.services.Status.OK) {
          console.log(result[0]);
          if (result[0].address.address_name) {
            stateController(result[0].address.address_name);
          }

          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);
        }
      });
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    window.daum.maps.event.addListener(map, "idle", function() {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
    function displayCenterInfo(result, status) {
      if (status === window.daum.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            stateController(result[i].address_name);
            break;
          }
        }
      }
    }
  };

  stateController = address => {
    this.setState({
      markedAddress: address
    });
  };

  handleDetailAddress = address => {
    this.setState({
      detailAddress: address
    });
  };

  handleDetailMode = () => {
    this.setState(prevState => ({
      detailMode: !prevState.detailMode
    }));
  };

  render() {
    return (
      <div className={cx("Wrap")}>
        <div ref={this.daumMap} className={cx("Map")} />
        <div className={cx("MarkedAddress")}>
          <div className={cx("AddressHere")}>
            {this.state.markedAddress && this.state.markedAddress}
            {this.state.detailMode && (
              <div className={cx("AddressDetail")}>
                <input
                  type="text"
                  onChange={e => this.handleDetailAddress(e.target.value)}
                  value={this.state.detailAddress}
                  placeholder="상세주소 입력하기"
                  autoFocus
                />
                <button>상세 주소로 설정하기</button>
              </div>
            )}
          </div>

          <button
            className={cx("HereIam")}
            onClick={() => this.handleDetailMode()}
          >
            이 위치로 주소 설정
          </button>
        </div>
      </div>
    );
  }
}

export default KakaoView;