var React = require('react');

// Component definition
class Popular extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			selectedLanguage: 'All'
		};

		// Binding (creates a function) to make sure that *this* is the current context
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	updateLanguage (lang) {
		this.setState(function () {
			return {
				selectedLanguage: lang
			};
		});
	}

	render() {
		var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
		return (
			<ul className ='languages'>
			{/* NOTE: When using the keyword function (as below), this creates a new context and *THIS* outside the functiion
			is not the same as *THIS* inside the function. Therefore, to have the same *THIS* as the outer context, *THIS*
			is added as a 2nd argument to .map */}
				{languages.map(function (lang) {
					return (
						<li
							style = {lang === this.state.selectedLanguage ? {color: '#D0021B'} : null}
							// Using .bind on onClick event so that we can pass
							// a specific language. First argument is null because 
							// we have already bound *this* to it
							// Function will only be invoked on click 
							onClick = {this.updateLanguage.bind(null, lang)}  
							key = {lang}>
							{lang}
						</li>
					);
				}, this)}
			</ul>
		);
	}
}


module.exports = Popular;