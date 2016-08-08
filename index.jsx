//new emaildo
// https://mongo-practice-green6erry.c9users.io/alt-react/#/contacts?_k=7lczc7

var React = require('react');
var ReactDOM = require('react-dom');

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;

var IndexRoute = router.IndexRoute;


var DATA = [{
    name: "Inbox",
    emails: [
                {
                    id: 0,
                    from: "billg@microsoft.com",
                    to: "TeamWoz@Woz.org",
                    title: "Possible work opportunity",
                    content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
                },
                {
                    id: 1,
                    from: "zuck@facebook.com",
                    to: "TeamWoz@Woz.org",
                    title: "Do you know PHP?",
                    content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
                }
            ]
},{
    name: "Spam",
    emails: [
                {
                    id: 0,
                    from: "ChEaPFl1ghTZ@hotmail.com",
                    to: "TeamWoz@Woz.org",
                    title: "WaNt CHEEp FlitZ",
                    content: "Theyre CheEp"
                },
                {
                    id: 1,
                    from: "NiKEAIRJordanZ@hotmail.com",
                    to: "TeamWoz@Woz.org",
                    title: "JorDanz For SAle",
                    content: "Theyre REELY CheEp"
                }
            ]
}];
        

// var data = [
//  { name: 'Inbox', emails: [ { id: 0, from: 'blah@blah.com'}, { ...etc } ]},
// { name: 'Spam', emails: [ { id: 23, from: 'massiveBigFun@blah.com'}, { ...etc } ]}
// ];



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
    console.log('props small ', props);
    var emails = props.box.emails.forEach(function(emailId, index) {
        var email = props.box.emails[index];
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
    console.log('small list emails ', emails);
    return (
        <ul class="message-list">
            {emails}
        </ul>
    );
};


var EmailBigList = function(props) {
    var email = props.email;
        return <EmailBig 
            id={email.id}
            from={email.from} 
            to={email.to} 
            title={email.title} 
            body={email.body}/>
        
    };



var BoxList = function(props) {
    var boxes = props.data.forEach(function(boxId, index) {
        var box = props.data[index];
        console.log('box ', box);
        return (
            <li key={index}>
                <Box name={box.name}
                         quantity={box.emails.length} />
            </li>
        );
    });
    console.log(boxes);
    return (
        <ul>
            {boxes}
        </ul>
    );
};

var EmailSmallListContainer = function() {
    // var emails = Object.getOwnPropertyNames(EMAILS);
    return <EmailSmallList box={DATA[0]} />;
}; 

var EmailBigListContainer = function() {
    return <EmailBigList email={DATA[0].emails[0]} />;
}; 


var BoxListContainer = function() {
    return <BoxList data={DATA} />;
};

var AllMail = function (props) {
    var messages = []
    var eachMessage = props.data.forEach(function(boxId, index){
        var box = props.data[index];
        box.emails.forEach(function(emailId, index){
            var email = box.emails[index];
            messages += email;
        });
    });
    console.log('messages ', messages);
    return messages;
};

var AllMailContainer = function () {
    return <AllMail data={DATA} />
};

var PageContainer = function() {
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
            <div class="main">
                <header class="header">
                    <form action="">
                        <input type="search" name="s" placeholder="Search" />
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
        </div> 
    );
};
console.log('page container please woooork ', PageContainer);

var App = function(props) {
    console.log('App ', App);
    return ( 
        <div>
            {props.children} 
        </div>
    );
};

var routes = (

    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={PageContainer} />
            <Route path="mail" component={PageContainer} />


        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});



// app.listen(process.env.PORT || 8080);



