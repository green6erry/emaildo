//new emaildo
// https://mongo-practice-green6erry.c9users.io/alt-react/#/contacts?_k=7lczc7

var React = require('react');
var ReactDOM = require('react-dom');

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;

var IndexRoute = router.IndexRoute;

var EMAILS = {
    inbox: {
        0: {
            id: 0,
            from: "billg@microsoft.com",
            to: "TeamWoz@Woz.org",
            title: "Possible work opportunity",
            content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
        },
        1: {
            id: 1,
            from: "zuck@facebook.com",
            to: "TeamWoz@Woz.org",
            title: "Do you know PHP?",
            content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
        }
    },
    spam: {
        0: {
            id: 0,
            from: "ChEaPFl1ghTZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "WaNt CHEEp FlitZ",
            content: "Theyre CheEp"
        },
        1: {
            id: 1,
            from: "NiKEAIRJordanZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "JorDanz For SAle",
            content: "Theyre REELY CheEp"
        }
    }
}

var Box = function(props) {
    return (
        <a href="#">
            {props.name} <span class="btn btn-primary">{props.quantity}</span>
        </a>
    );
};



var EmailSmall = function(props) {
    return (
            <div class="preview">
              <h3>{props.from}<small>{props.to}</small></h3>
              <p><strong>{props.title}</strong>First line ...</p>
            </div>

    );
};

var EmailBig = function(props) {
    return (
        <section class="message">
            <h2><span class="icon icon-star-large"></span>{props.title}<span class="icon icon-reply-large"></span><span class="icon icon-delete-large"></span></h2>
        <div class="meta-data">
          <p>
            <img src="http://placehold.it/40x40" class="avatar" alt="" />
            {props.from} to <span class="user">{props.to}</span>
            <span class="date">July 15, 2016</span>
          </p>
        </div>
        <div class="body">
          {props.body}
        </div>
      </section>

    );
};

var EmailSmallList = function(props) {
    //Object is Inbox or spam
    var emails = Object.keys(props.emails).map(function(emailId, index) {
        var email = props.emails[emailId];
        return (
            <li key={index} class="email-menu-item">
                <input type="checkbox" />
                <EmailSmall 
                id={email.id}
                from={email.from} 
                to={email.to} 
                title={email.title} />
            </li>
        );
    });
    return (
        <ul class="message-list">
            {emails}
        </ul>
    );
};

//
var EmailSmallList = function(props) {
    //Object is Inbox or spam
    var emails = Object.keys(props.boxes).map(function(boxId, index) {
        var box = props.boxes[boxId].map(function(emailId, index){
            var email = box.emails[emailId];
            return (
            <li key={index} class="email-menu-item">
                <input type="checkbox" />
                <EmailSmall 
                id={email.id}
                from={email.from} 
                to={email.to} 
                title={email.title} />
            </li>
            );
        })
    });
    return (
        <ul class="message-list">
            {emails}
        </ul>
    );
};

var EmailBigList = function(props) {
    var email = Object.keys(props.boxes).map(function(boxId, index) {
        var box = props.boxes[boxId].emails;
        box.find(function(emailId) {
            return box.emails[emailId];
        });
            return (
            <li key={index} class="email-menu-item">
                <input type="checkbox" />
                <EmailSmall 
                id={email.id}
                from={email.from} 
                to={email.to} 
                title={email.title} />
            </li>
            );
        });
    
        return <EmailBig 
            id={email.id}
            from={email.from} 
            to={email.to} 
            title={email.title} 
            body={email.body}/>
        
    };



var BoxList = function(props) {
    var boxes = Object.keys(props.boxes).map(function(boxId, index) {
        var box = props.boxes[boxId];
        return (
            <li key={index}>
                <Box id={box.id} name={box.name}
                         quantity={box.quantity} />
            </li>
        );
    });
    return (
        <ul>
            {boxes}
        </ul>
    );
};

var EmailSmallListContainer = function() {
    // var emails = Object.getOwnPropertyNames(EMAILS);
    return <EmailSmallList emails={EMAILS} />;
}; 

var EmailBigListContainer = function() {
    return <EmailBigList email={EMAILS} />;
}; 


var BoxListContainer = function() {
    return <BoxList boxes={EMAILS} />;
};



var PageContainer = function() {
    return (
        <div class="main">
            <header class="header">
                <form action="">
                    <input type="search" name="s" placeholder="Search on simplest" />
                    </form>
                <nav class="nav-settings">
                    <ul>
                        <li><a href="#" class="icon icon-gear"></a></li>
                        </ul>
                    </nav>
                <div class="clr"></div>
            </header>
            <div class="container">
                <div class="messages">
                    <h1>Inbox <span class="icon icon-arrow-down"></span></h1>
                    <form action="">
                        <input type="search" class="search" placeholder="Search Inbox" />
                    </form>
                    <EmailSmallListContainer />
                </div>
                <EmailBigListContainer />
            </div>
        </div>   
    );
};

var App = function(props) {
    return (
        <div class="container app">
            <aside class="sidebar">
                <h1 class="logo">
                    <a href="#">eMAILdo!</a>
                </h1>
                <nav class="main-nav">
                    <ul>
                        <li><a href="#">Profile</a></li>
                        <li class="active">
                            <a href="#">Email</a><br />
                            <a href="#" class="btn btn-primary">Compose new</a>
                            <BoxListContainer />
                            </li>
                        <li><a href="#">Docs</a></li>
                        <li><a href="#">Stats</a></li>
                    </ul>
                </nav>
            </aside>
            {props.children}
        </div>
    );
};

var routes = (
    <Router history={hashHistory}>
        <Route path="/mail" component={App}>
            <IndexRoute component={PageContainer} />
            <Route path=":boxId" component={EmailBigListContainer} />
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});

//app.listen(process.env.PORT || 8080);



