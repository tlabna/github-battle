const React = require('react');
const Popular = require('./Popular');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const {Route, Switch} = ReactRouter;
const Nav = require('./Nav');
const Home = require('./Home');
const Battle = require('./Battle');
const Results = require('./Results');


// Component definition
class App extends React.Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Nav />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/battle' component={Battle} />
						<Route path='/battle/results' component={Results} />
						<Route path='/popular' component={Popular} />
						<Route render={() => <p>Not Found</p>} />
					</Switch>
				</div>
			</Router>
		);
	}
}

// Must export so that App component it is available in index.js
// Called CommonJS
module.exports = App;