var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

// This is a Stateless Functional Component (SFC).
// If a component only has a render method
// then it's best practice to use this kind of function.
// Using SFCs is good for separating persentational components from other components.
// It has no state and it's a function, hence, SFC
// Note: React passes props to function as 1st arg
function SelectLanguage (props) {
	var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
	
	return (
		<ul className ='languages'>
		{/* NOTE: When using the keyword function (as below), this creates a new context and *THIS* outside the functiion
		is not the same as *THIS* inside the function. Therefore, to have the same *THIS* as the outer context, *THIS*
		is added as a 2nd argument to .map */}
			{languages.map(function (lang) {
				return (
					<li
						style = {lang === props.selectedLanguage ? {color: '#D0021B'} : null}
						// Using .bind on onClick event so that we can pass
						// a specific language. First argument is null because 
						// we have already bound *this* to it
						// Function will only be invoked on click 
						onClick = {props.onSelect.bind(null, lang)}  
						key = {lang}>
						{lang}
					</li>
				);
			})}
		</ul>
	);
}

function RepoGrid (props) {
	return (
		<ul className='popular-list'>
			{props.repos.map(function (repo, index) {
				return (
					<li key={repo.name} className='popular-item'>
						<div className='popular-rank'>#{index + 1}</div>
						<ul className='space-list-items'>
							<li>
								<img 
									className='avatar'
									src={repo.owner.avatar_url}
									alt={'Avatar for ' + repo.owner.login}
								/>
							</li>
							<li><a href={repo.html_url}>{repo.name}</a></li>
							<li>@{repo.owner.login}</li>
							<li>{repo.stargazers_count} stars</li>
						</ul>
					</li>
				);
			})}			
		</ul>
	);
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
};

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

// Component definition
class Popular extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null
		};

		// Binding (creates a function) to make sure that *this* is the current context
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount () {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage (lang) {
		this.setState(function () {
			return {
				selectedLanguage: lang,
				repos: null
			};
		});

		api.fetchPopularRepos(lang)
			.then(function (repos) {
				this.setState(function () {
					return {
						repos: repos
					};
				});
			}.bind(this));
	}

	render() {
		return (
			<div>
				<SelectLanguage 
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{!this.state.repos
					? <p>LOADING</p>
					: <RepoGrid repos={this.state.repos} />
				}
			</div>
		);
	}
}


module.exports = Popular;