import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

// This is a Stateless Functional Component (SFC).
// If a component only has a render method
// then it's best practice to use this kind of function.
// Using SFCs is good for separating persentational components from other components.
// It has no state and it's a function, hence, SFC
// Note: React passes props to function as 1st arg
function SelectLanguage ({selectedLanguage, onSelect}) {
	const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
	
	return (
		<ul className ='languages'>
		{/* NOTE: When using the keyword function (as below), this creates a new context and *THIS* outside the functiion
		is not the same as *THIS* inside the function. Therefore, to have the same *THIS* as the outer context, *THIS*
		is added as a 2nd argument to .map */}
			{languages.map((lang) => (
				<li
					style = {lang === selectedLanguage ? {color: '#D0021B'} : null}
					// Using .bind on onClick event so that we can pass
					// a specific language. First argument is null because 
					// we have already bound *this* to it
					// Function will only be invoked on click 
					onClick = {() => onSelect(lang)}  
					key = {lang}>
					{lang}
				</li>
			))}
		</ul>
	);
}

function RepoGrid ({ repos }) {
	return (
		<ul className='popular-list'>
			{repos.map(({name, owner, html_url, stargazers_count}, index) => (
				<li key={name} className='popular-item'>
					<div className='popular-rank'>#{index + 1}</div>
					<ul className='space-list-items'>
						<li>
							<img 
								className='avatar'
								src={owner.avatar_url}
								alt={'Avatar for ' + owner.login}
							/>
						</li>
						<li><a href={html_url}>{name}</a></li>
						<li>@{owner.login}</li>
						<li>{stargazers_count} stars</li>
					</ul>
				</li>
			))}			
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
	state = {
		selectedLanguage: 'All',
		repos: null
	}

	componentDidMount () {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage = async (lang) => {
		this.setState(() => ({
			selectedLanguage: lang,
			repos: null
		}));

		const repos = await fetchPopularRepos(lang);
		this.setState(() => ({ repos }));
	}

	render() {
		const {selectedLanguage, repos} = this.state;

		return (
			<div>
				<SelectLanguage 
					selectedLanguage={selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{!repos
					? <Loading />
					: <RepoGrid repos={repos} />
				}
			</div>
		);
	}
}

//module.exports = Popular;
export default Popular;