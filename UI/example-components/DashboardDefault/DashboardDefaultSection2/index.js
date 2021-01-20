import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  IconButton,
  LinearProgress,
  Card,
  CardContent,
  Button,
  Tooltip
} from '@material-ui/core';
import avatar1 from "../../../assets/images/avatars/wordcloud1.png";

export default function LivePreviewExample() {
  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header pr-2">
          <div className="card-header--title"><b><h5>KB 국민은행 관련 키워드 분석</h5></b></div>
          <div className="card-header--actions">
            <Tooltip arrow title="Refresh">
              <IconButton size="small" color="primary" className="mr-3">
                <FontAwesomeIcon icon={['fas', 'cog']} spin />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <CardContent className="p-3">
          <div className="table-responsive">
            <table className="table table-borderless table-hover text-nowrap mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="text-left">키워드</th>
                  <th className="text-center">긍부정</th>
                  <th className="text-center">관련 기사</th>
                  {/*<th className="text-center">Actions</th>*/}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <div>
                      <a
                        href="#/"
                        onClick={e => e.preventDefault()}
                        className="font-weight-bold text-black"
                        title="...">
                        오류
                      </a>
                      <span className="text-black-50 d-block">
                        국민은행 앱 오류, 어플리케이션 오류
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="badge badge-danger px-4">negative</div>
                  </td>
                  <td>
                    <a href = "http://news.kbs.co.kr/news/view.do?ncd=5023330&ref=A"><u>[KBS] KB국민은행 인터넷뱅킹 접속 오류로 고객 불편</u></a>
                    {/*<LinearProgress value={55} color="primary" />*/}
                  </td>
                  {/*<td className="text-center">*/}
                  {/*  <Tooltip arrow title="View Details">*/}
                  {/*    <IconButton*/}
                  {/*      size="small"*/}
                  {/*      variant="outlined"*/}
                  {/*      color="primary">*/}
                  {/*      <FontAwesomeIcon icon={['fas', 'arrow-right']} />*/}
                  {/*    </IconButton>*/}
                  {/*  </Tooltip>*/}
                  {/*</td>*/}
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <div>
                      <a
                        href="#/"
                        onClick={e => e.preventDefault()}
                        className="font-weight-bold text-black"
                        title="...">
                        리브
                      </a>
                      <span className="text-black-50 d-block">
                        리브 (Liiv), 리브 이벤트
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="px-4 badge badge-success">positive</div>
                  </td>
                  <td>
                    <a href = "http://www.businesspost.co.kr/BP?command=article_view&num=198097"><u>KB국민은행 '리브M', 위메프 애플 브랜드샵과 '포인트리' 제공 이벤트</u></a>
                    {/*<LinearProgress value={55} color="primary" />*/}
                  </td>
                  {/*<td className="text-center">*/}
                  {/*  <Tooltip arrow title="View Details">*/}
                  {/*    <IconButton*/}
                  {/*      size="small"*/}
                  {/*      variant="outlined"*/}
                  {/*      color="primary">*/}
                  {/*      <FontAwesomeIcon icon={['fas', 'arrow-right']} />*/}
                  {/*    </IconButton>*/}
                  {/*  </Tooltip>*/}
                  {/*</td>*/}
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <div>
                      <a
                        href="#/"
                        onClick={e => e.preventDefault()}
                        className="font-weight-bold text-black"
                        title="...">
                        서버
                      </a>
                      <span className="text-black-50 d-block">
                        서버 점검
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="badge badge-danger px-4">negative</div>
                  </td>
                  <td>
                    <a href = "https://www.ajunews.com/view/20150624110907235"><u>국민은행 전산장애에 네티즌 "어쩐지 이체가"…현재 복구 완료</u></a>
                    {/*<LinearProgress value={67} color="primary" />*/}
                  </td>
                  {/*<td className="text-center">*/}
                  {/*  <Tooltip arrow title="View Details">*/}
                  {/*    <IconButton*/}
                  {/*      size="small"*/}
                  {/*      variant="outlined"*/}
                  {/*      color="primary">*/}
                  {/*      <FontAwesomeIcon icon={['fas', 'arrow-right']} />*/}
                  {/*    </IconButton>*/}
                  {/*  </Tooltip>*/}
                  {/*</td>*/}
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <div>
                      <a
                        href="#/"
                        onClick={e => e.preventDefault()}
                        className="font-weight-bold text-black"
                        title="...">
                        허인
                      </a>
                      <span className="text-black-50 d-block">
                        허인 행장, 행장 연임
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="px-4 badge badge-success">positive</div>
                  </td>
                  <td>
                    <a href = "http://news.mk.co.kr/v2/economy/view.php?year=2020&no=1121264"><u>[CEO LOUNGE] 3연임 성공 허인 KB국민은행장 | 은행권 1위 수성…디지털 전략 통했다</u></a>
                    {/*<LinearProgress value={39} color="primary" />*/}
                  </td>
                  {/*<td className="text-center">*/}
                  {/*  <Tooltip arrow title="View Details">*/}
                  {/*    <IconButton*/}
                  {/*      size="small"*/}
                  {/*      variant="outlined"*/}
                  {/*      color="primary">*/}
                  {/*      <FontAwesomeIcon icon={['fas', 'arrow-right']} />*/}
                  {/*    </IconButton>*/}
                  {/*  </Tooltip>*/}
                  {/*</td>*/}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
        {/*<div className="card-footer d-flex justify-content-between">*/}
        {/*  <Button color="primary" size="small">*/}
        {/*    Delete*/}
        {/*  </Button>*/}
        {/*  <div>*/}
        {/*    <Button*/}
        {/*      size="small"*/}
        {/*      variant="contained"*/}
        {/*      className="mr-3"*/}
        {/*      color="primary">*/}
        {/*      View all*/}
        {/*    </Button>*/}
        {/*    <Button size="small" variant="contained" color="secondary">*/}
        {/*      Add new entry*/}
        {/*    </Button>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </Card>

      <Card className="card-box mb-4">
        <div className="card-header pr-2">
          <div className="card-header--title"><b><h5>KB 국민은행 관련 WORDCLOUD</h5></b></div>
          <div className="card-header--actions">
            <Tooltip arrow title="Refresh">
              <IconButton size="small" color="primary" className="mr-3">
                <FontAwesomeIcon icon={['fas', 'cog']} spin />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <CardContent className="p-3">
          <div className="d-flex flex-row flex-wrap justify-content-center">
          <div className="position-relative px-5 py-3">
          <img alt="..." className="img-fluid" src={avatar1} />
          </div>
            </div>
          {/*<div className="table-responsive">*/}
          {/*  <table className="table table-borderless table-hover text-nowrap mb-0">*/}
          {/*    <thead>*/}
          {/*      <tr>*/}
          {/*        <th>#</th>*/}
          {/*        <th className="text-left">키워드</th>*/}
          {/*        <th className="text-center">긍부정</th>*/}
          {/*        <th className="text-center">관련 기사</th>*/}
          {/*        /!*<th className="text-center">Actions</th>*!/*/}
          {/*      </tr>*/}
          {/*    </thead>*/}
          {/*    <tbody>*/}
          {/*      <tr>*/}
          {/*        <td>1</td>*/}
          {/*        <td>*/}
          {/*          <div>*/}
          {/*            <a*/}
          {/*              href="#/"*/}
          {/*              onClick={e => e.preventDefault()}*/}
          {/*              className="font-weight-bold text-black"*/}
          {/*              title="...">*/}
          {/*              오류*/}
          {/*            </a>*/}
          {/*            <span className="text-black-50 d-block">*/}
          {/*              국민은행 앱 오류, 어플리케이션 오류*/}
          {/*            </span>*/}
          {/*          </div>*/}
          {/*        </td>*/}
          {/*        <td className="text-center">*/}
          {/*          <div className="badge badge-danger px-4">negative</div>*/}
          {/*        </td>*/}
          {/*        <td>*/}
          {/*          <a href = "http://news.kbs.co.kr/news/view.do?ncd=5023330&ref=A"><u>[KBS] KB국민은행 인터넷뱅킹 접속 오류로 고객 불편</u></a>*/}
          {/*          /!*<LinearProgress value={55} color="primary" />*!/*/}
          {/*        </td>*/}
          {/*        /!*<td className="text-center">*!/*/}
          {/*        /!*  <Tooltip arrow title="View Details">*!/*/}
          {/*        /!*    <IconButton*!/*/}
          {/*        /!*      size="small"*!/*/}
          {/*        /!*      variant="outlined"*!/*/}
          {/*        /!*      color="primary">*!/*/}
          {/*        /!*      <FontAwesomeIcon icon={['fas', 'arrow-right']} />*!/*/}
          {/*        /!*    </IconButton>*!/*/}
          {/*        /!*  </Tooltip>*!/*/}
          {/*        /!*</td>*!/*/}
          {/*      </tr>*/}
          {/*      <tr>*/}
          {/*        <td>2</td>*/}
          {/*        <td>*/}
          {/*          <div>*/}
          {/*            <a*/}
          {/*              href="#/"*/}
          {/*              onClick={e => e.preventDefault()}*/}
          {/*              className="font-weight-bold text-black"*/}
          {/*              title="...">*/}
          {/*              리브*/}
          {/*            </a>*/}
          {/*            <span className="text-black-50 d-block">*/}
          {/*              리브 (Liiv), 리브 이벤트*/}
          {/*            </span>*/}
          {/*          </div>*/}
          {/*        </td>*/}
          {/*        <td className="text-center">*/}
          {/*          <div className="px-4 badge badge-success">positive</div>*/}
          {/*        </td>*/}
          {/*        <td>*/}
          {/*          <a href = "http://www.businesspost.co.kr/BP?command=article_view&num=198097"><u>KB국민은행 '리브M', 위메프 애플 브랜드샵과 '포인트리' 제공 이벤트</u></a>*/}
          {/*          /!*<LinearProgress value={55} color="primary" />*!/*/}
          {/*        </td>*/}
          {/*        /!*<td className="text-center">*!/*/}
          {/*        /!*  <Tooltip arrow title="View Details">*!/*/}
          {/*        /!*    <IconButton*!/*/}
          {/*        /!*      size="small"*!/*/}
          {/*        /!*      variant="outlined"*!/*/}
          {/*        /!*      color="primary">*!/*/}
          {/*        /!*      <FontAwesomeIcon icon={['fas', 'arrow-right']} />*!/*/}
          {/*        /!*    </IconButton>*!/*/}
          {/*        /!*  </Tooltip>*!/*/}
          {/*        /!*</td>*!/*/}
          {/*      </tr>*/}
          {/*      <tr>*/}
          {/*        <td>3</td>*/}
          {/*        <td>*/}
          {/*          <div>*/}
          {/*            <a*/}
          {/*              href="#/"*/}
          {/*              onClick={e => e.preventDefault()}*/}
          {/*              className="font-weight-bold text-black"*/}
          {/*              title="...">*/}
          {/*              서버*/}
          {/*            </a>*/}
          {/*            <span className="text-black-50 d-block">*/}
          {/*              서버 점검*/}
          {/*            </span>*/}
          {/*          </div>*/}
          {/*        </td>*/}
          {/*        <td className="text-center">*/}
          {/*          <div className="badge badge-danger px-4">negative</div>*/}
          {/*        </td>*/}
          {/*        <td>*/}
          {/*          <a href = "https://www.ajunews.com/view/20150624110907235"><u>국민은행 전산장애에 네티즌 "어쩐지 이체가"…현재 복구 완료</u></a>*/}
          {/*          /!*<LinearProgress value={67} color="primary" />*!/*/}
          {/*        </td>*/}
          {/*        /!*<td className="text-center">*!/*/}
          {/*        /!*  <Tooltip arrow title="View Details">*!/*/}
          {/*        /!*    <IconButton*!/*/}
          {/*        /!*      size="small"*!/*/}
          {/*        /!*      variant="outlined"*!/*/}
          {/*        /!*      color="primary">*!/*/}
          {/*        /!*      <FontAwesomeIcon icon={['fas', 'arrow-right']} />*!/*/}
          {/*        /!*    </IconButton>*!/*/}
          {/*        /!*  </Tooltip>*!/*/}
          {/*        /!*</td>*!/*/}
          {/*      </tr>*/}
          {/*      <tr>*/}
          {/*        <td>4</td>*/}
          {/*        <td>*/}
          {/*          <div>*/}
          {/*            <a*/}
          {/*              href="#/"*/}
          {/*              onClick={e => e.preventDefault()}*/}
          {/*              className="font-weight-bold text-black"*/}
          {/*              title="...">*/}
          {/*              허인*/}
          {/*            </a>*/}
          {/*            <span className="text-black-50 d-block">*/}
          {/*              허인 행장, 행장 연임*/}
          {/*            </span>*/}
          {/*          </div>*/}
          {/*        </td>*/}
          {/*        <td className="text-center">*/}
          {/*          <div className="px-4 badge badge-success">positive</div>*/}
          {/*        </td>*/}
          {/*        <td>*/}
          {/*          <a href = "http://news.mk.co.kr/v2/economy/view.php?year=2020&no=1121264"><u>[CEO LOUNGE] 3연임 성공 허인 KB국민은행장 | 은행권 1위 수성…디지털 전략 통했다</u></a>*/}
          {/*          /!*<LinearProgress value={39} color="primary" />*!/*/}
          {/*        </td>*/}
          {/*        /!*<td className="text-center">*!/*/}
          {/*        /!*  <Tooltip arrow title="View Details">*!/*/}
          {/*        /!*    <IconButton*!/*/}
          {/*        /!*      size="small"*!/*/}
          {/*        /!*      variant="outlined"*!/*/}
          {/*        /!*      color="primary">*!/*/}
          {/*        /!*      <FontAwesomeIcon icon={['fas', 'arrow-right']} />*!/*/}
          {/*        /!*    </IconButton>*!/*/}
          {/*        /!*  </Tooltip>*!/*/}
          {/*        /!*</td>*!/*/}
          {/*      </tr>*/}
          {/*    </tbody>*/}
          {/*  </table>*/}
          {/*</div>*/}
        </CardContent>
        {/*<div className="card-footer d-flex justify-content-between">*/}
        {/*  <Button color="primary" size="small">*/}
        {/*    Delete*/}
        {/*  </Button>*/}
        {/*  <div>*/}
        {/*    <Button*/}
        {/*      size="small"*/}
        {/*      variant="contained"*/}
        {/*      className="mr-3"*/}
        {/*      color="primary">*/}
        {/*      View all*/}
        {/*    </Button>*/}
        {/*    <Button size="small" variant="contained" color="secondary">*/}
        {/*      Add new entry*/}
        {/*    </Button>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </Card>
    </Fragment>
  );
}
