import './App.css';
import { Component, lazy, Suspense } from 'react';
import MainPage from './views/MainPage';
import LoginPage from './views/LoginForm';
import JoinPage from './views/JoinFrom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Appbar from './views/Appbar';
import Footbar from './views/Footbar';
import AdminPage from './views/AdminPage';
import UpdatePage from './views/UpdatePage';
import DetailPage from './views/DetailPage';
import MyPage from './views/MyPage';
import MyFavor from './views/MyFavor';
import MyBasket from './views/MyBasket';
import C_All from './views/C_All';
import Category from './views/Category';
import ResultPage from './views/ResultPage';
import NotPage from './views/NotPage';
import QuestionForm from './views/QuestionForm';
import Q_Content from './views/Q_Content';
import MyQpage from './views/MyQpage';
import MyQ_Content from './views/MyQ_Content';
import Answer from './views/Answer';
import A_Content from './views/A_Content';
import MyA_Content from './views/MyA_Content';
import Auth from './views/Auth';
import Forget from './views/Forget';
import P_Auth from './views/P_Auth';
import NewPw from './views/NewPw';
import Board from './views/Board';
import BoardWrite from './components/BoardWrite';
import BoardPage from './views/BoardPage';
import BoardUpdate from './components/BoardUpdate';
import Fail from './views/Fail';
import Success from './views/Success';
//import PayPage from './views/PayPage';

const PayPage = lazy(() => import('./views/PayPage'));

class FullPage extends Component {
  render() {
    if (window.location.pathname === '/payment') {
      return (
        <Router>
          <Suspense fallback="">
            <PayPage />
          </Suspense>
        </Router>
      );
    } else if (window.location.pathname === '/pg_paypal_payment_failed') {
      return (
        <Suspense fallback="">
          <Fail />
        </Suspense>
      );
    } else if (window.location.pathname === '/pg_paypal_payment_success') {
      return (
        <Suspense fallback="">
          <Success />
        </Suspense>
      );
    } else {
      return (
        <Router>
          <Appbar></Appbar>
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/join" component={JoinPage} />
          <Route path="/manage" component={AdminPage} />
          <Route path="/update" component={UpdatePage} />
          <Route path="/detail" component={DetailPage} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/myfavor" component={MyFavor} />
          <Route path="/mybasket" component={MyBasket} />
          <Route path="/category" component={C_All} />
          <Route path="/translation" component={Category} />
          <Route path="/search" component={ResultPage} />
          <Route path="/notfound" component={NotPage} />
          <Route path="/question" component={QuestionForm} />
          <Route path="/admincontent" component={Q_Content} />
          <Route path="/mydetail" component={MyQpage} />
          <Route path="/clientcontent" component={MyQ_Content} />
          <Route path="/answer" component={Answer} />
          <Route path="/adminAnswer" component={A_Content} />
          <Route path="/myanswer" component={MyA_Content} />
          <Route path="/auth" component={Auth} />
          <Route path="/forget" component={Forget} />
          <Route path="/newpw" component={P_Auth} />
          <Route path="/change_pw" component={NewPw} />
          <Route path="/board" component={Board} />
          <Route path="/b_write" component={BoardWrite} />
          <Route path="/boardpage" component={BoardPage} />
          <Route path="/b_update" component={BoardUpdate} />
          <Footbar></Footbar>
        </Router>
      );
    }
  }
}

export default FullPage;
