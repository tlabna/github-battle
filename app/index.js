var React    = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

// Component might have:
// State
// Lifecycle event
// UI

// Component definition
class App extends React.Component {
	render() {
		return (
			<div>
				Hello React World!!!
			</div>
		);
	}
}

// Component Invocation:
// <App />
ReactDOM.render(
	<App />,
	document.getElementById('app')
);
