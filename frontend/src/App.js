import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/storage';
import './App.css';


class UserIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount(){
    var db = firebase.firestore();
    db.collection("users").doc(this.props.userId).get().then((query)=>{
      this.setState(query.data());
    })
  }
  render() {
    return (
      <a className="user-prof"
        href={"https://twitter.com/"+this.state.screenName}>
        <img src={this.state.photoURL}
          width="25" height="25" />
      </a>
    );
  }
}

class Category extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          {this.props.name}
          <b>( {this.props.users?.length} )</b>
        </div>
        <div className="card-body">
          {
            this.props.public_users?.map(function(userId, i){
              return <UserIcon userId={userId} key={i} />;
            })
          }
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {categories: []};
  }

  componentWillMount() {
    this.state.categories = []
    
    var firebaseConfig = {
      "projectId": "imhere-yuiseki-net",
      "appId": "1:967182170171:web:e48d66fa1e10ba175d441e",
      "databaseURL": "https://imhere-yuiseki-net.firebaseio.com",
      "storageBucket": "imhere-yuiseki-net.appspot.com",
      "locationId": "us-central",
      "apiKey": "AIzaSyAqQZ2Ijab5lA2QrAzH7Nu_d89QE9Jh430",
      "authDomain": "imhere-yuiseki-net.firebaseapp.com",
      "messagingSenderId": "967182170171",
      "measurementId": "G-V37GM8KLSZ"
    };
    if (firebaseConfig) {
      firebase.initializeApp(firebaseConfig);
    }

    let app = firebase.app();
    let features = ['auth', 'firestore', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
    var db = firebase.firestore();
    var categories = [];
    db.collection("categories").orderBy("name").get().then((query)=>{
      query.forEach((cat)=>{
        categories.push(cat.data())
        this.setState({categories:categories})
      })
    })
  };
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div className="jumbotron">
            <h1>#imhere by yuiseki</h1>
            <h2>あらゆるマイノリティの可視化を目標としているプラットフォームです。</h2>
            <h2>Twitterアカウントでログインして、自分のような属性の人間が存在していることを世界にアピールできます。</h2>
            <h2>匿名でも顕名でも利用できます。</h2>
            <h2>このウェブサイトから得たいかなる情報も差別に使うことを絶対に禁止します。発見した場合即座に法務省人権擁護局へ通報します。</h2>
            <div id="wrap">
              <a className="twitter-login-button" datasize="large" href="/home.html">
                <img src="https://cdn.cms-twdigitalassets.com/content/dam/developer-twitter/icons/sign-in-with-twitter-gray-1-png-img-fullhd-medium.png.img.fullhd.medium.png" />
              </a>
            </div>
          </div>
        </header>
        <content className="App-content">
          <div id="categories" className="card-columns">
            {
              this.state.categories.map(function(cat, i){
                return <Category name={cat.name} users={cat.users} public_users={cat.public_users} key={i} />
              })
            }
          </div>
        </content>
      </div>
    );
  }
}

export default App;
