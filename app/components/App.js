var React = require('react');
var Popular = require('./Popular');

// Component definition
class App extends React.Component {
	render() {
		return (
			<div className='container'>
				<Popular />
			</div>
		);
	}
}

// Must export so that App component it is available in index.js
// Called CommonJS
module.exports = App;