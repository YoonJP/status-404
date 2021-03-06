import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import withLoading from "../../HOC/withLoading";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
// https://www.npmjs.com/package/react-responsive-carousel
import styles from "./Main.module.scss";
import classNames from "classnames/bind";

import { ReactComponent as Hansik } from "../../img/01_hansik.svg";
import { ReactComponent as Bunsik } from "../../img/02_bunsik.svg";
import { ReactComponent as Ilsik } from "../../img/03_ilsik.svg";
import { ReactComponent as Chicken } from "../../img/04_chicken.svg";
import { ReactComponent as Pizza } from "../../img/05_pizza.svg";
import { ReactComponent as Chinese } from "../../img/06_chinese.svg";
import { ReactComponent as Desert } from "../../img/11_desert.svg";
import { ReactComponent as Fastfood } from "../../img/12_fastfood.svg";
import { ReactComponent as Franchise } from "../../img/13_franchise.svg";
import { ReactComponent as SearchIcon } from "../../img/search.svg";

import MainBanner01 from "../../img/main_banner_01.svg";
import MainBanner02 from "../../img/main_banner_02.svg";
import MainBanner03 from "../../img/main_banner_03.svg";

const cx = classNames.bind(styles);

class MainView extends Component {
  // MainView :: Main 컴포넌트의 view 를 담당하는 컴포넌트
  static defaultProps = {
    // 카테고리 가데이터
    lists: [
      {
        id: 1,
        name: "한식",
        img: <Hansik />
      },
      {
        id: 2,
        name: "일식",
        img: <Ilsik />
      },
      {
        id: 3,
        name: "카페",
        img: <Desert />
      },
      {
        id: 4,
        name: "양식",
        img: <Franchise />
      },
      {
        id: 5,
        name: "분식",
        img: <Bunsik />
      },
      {
        id: 6,
        name: "햄버거",
        img: <Fastfood />
      },
      {
        id: 7,
        name: "치킨",
        img: <Chicken />
      },
      {
        id: 8,
        name: "중국집",
        img: <Chinese />
      },
      {
        id: 9,
        name: "피자",
        img: <Pizza />
      }
    ]
  };

  render() {
    const { lists, hanldePolicy } = this.props;

    return (
      <div className={cx("wrap")}>
        <div className={cx("body")}>
          <div className={cx("carousel")}>
            <Carousel
              showArrows={false}
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              dynamicHeight={false}
              emulateTouch={true}
              // autoPlay={true}
              // infiniteLoop={true}
            >
              <div>
                <img src={MainBanner02} alt="img" />
              </div>
              <div>
                <img src={MainBanner03} alt="img" />
              </div>
              <div>
                <img src={MainBanner01} alt="img" />
              </div>
            </Carousel>
          </div>

          <ul className={cx("categories")}>
            {lists.map(c => {
              return (
                <li className={cx("item")} key={c.name}>
                  <Link to={`/category/${c.id}`}>
                    {c.img}
                    {c.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={cx("findMatzip")}>
            <Link to={`/restaurant-search`}>
              <div className={cx("inner")}>
                <span>우리동네 맛집 검색</span>
                <SearchIcon className={cx("icon")} />
              </div>
            </Link>
          </div>

          <ul className={cx("noticeList")}>
            <li className={cx("item")}>
              <span className={cx("itemTitle")}>공지</span>
              <span className={cx("itemBody")}>
                KT 아현지사 화재로 인한 인근지역 주문불가 안내
              </span>
            </li>
            <li className={cx("item")}>
              <span className={cx("itemTitle")}>이벤트</span>
              <span className={cx("itemBody")}>
                [배민] 11월 또래오래 선착순 2천원 할인해드려요!
              </span>
            </li>
            <li className={cx("item")}>
              <span className={cx("itemTitle")}>발표</span>
              <span className={cx("itemBody")}>
                [당첨자공지] 세계 축구대회 스웨덴전 기념 오늘은 몇대몇 이벤트
                당첨자 공지
              </span>
            </li>
          </ul>

          <div className={cx("bottomBanner")}>{/* <BottomBanner /> */}</div>
        </div>

        <div className={cx("footer")}>
          <ul className={cx("footerLink")}>
            <li className={cx("footerLinkItem")} onClick={() => hanldePolicy()}>
              사업자정보확인
            </li>
            <li className={cx("footerLinkItem")} onClick={() => hanldePolicy()}>
              이용약관
            </li>
            <li className={cx("footerLinkItem")} onClick={() => hanldePolicy()}>
              전자금융거래 이용약관
            </li>
            <li className={cx("footerLinkItem")} onClick={() => hanldePolicy()}>
              개인정보 처리방침
            </li>
            
          </ul>
          <div className={cx("company")}>
            <p className={cx("companyTitle")}>Status404</p>
            <p className={cx("companyBody")}>
              배달의민족은 통신판매중개자이며 통신판매의 당사자가 아닙니다.{" "}
              <br />
              따라서 배달의 민족은 상품거래정보 및 거래에 대한 책임을 지지
              않습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withLoading(MainView);
