import React from 'react';
import { Link, Element } from 'react-scroll'

import LoadingSection from './sections/loading.js';
import ReelsSection from './sections/reels.js';
import AboutMeSection from './sections/about-me.js';
import SkillsSection from './sections/skills.js';
import PortfolioSection from './sections/portfolio.js';
import ContactMeSection from './sections/contactme.js';
import CopyrightSection from './sections/copyright.js';

import './styles/index.css';
import './styles/page.css';

export default class Page extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			loading: false,
			displaying: false,
			slided: false,
			mobile: false,
		};
	}

	async componentDidMount()
	{
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions.bind(this));
		window.addEventListener('scroll', this.handleScroll.bind(this));

		this.setState({
			loading: true,
		});
	}

	handleLoaded()
	{
		this.setState({
			displaying: true,
		});
	}

	handleFaded()
	{
		this.setState({
			loading: false,
		});
	}

	handleSlided()
	{
		this.setState({
			slided: true,
		})
	}

	render()
	{
		const mobile = this.state.mobile;
		const loading = this.state.loading;
		const displaying = this.state.displaying;
		const slided = this.state.slided;

		return (
			<div className={ `page ${ slided ? 'page-white' : '' }`}>
				<> { loading &&
					<LoadingSection
						mobile={ mobile }
						onLoaded={ this.handleLoaded.bind(this) }
						onFaded={ this.handleFaded.bind(this) }
					/>
				} </>
				<> { displaying &&
					<div>
						<Element name="reels">
							<ReelsSection
								mobile={ mobile }
								onSlided={ this.handleSlided.bind(this) }
							/>
						</Element>
						<Element name="aboutme">
							<AboutMeSection
								mobile={ mobile }
							/>
						</Element>
						<Element name="skills">
							<SkillsSection
								mobile={ mobile }
							/>
						</Element>
						<Element name="portfolio">
							<PortfolioSection
								mobile={ mobile }
							/>
						</Element>
						<Element name="contactme">
							<ContactMeSection
								mobile={ mobile }
							/>
						</Element>
						<CopyrightSection
							mobile={ mobile }
						/>
					</div>
				} </>
			</div>
		);
	}

	updateDimensions()
	{
		const width = window.innerWidth;
		const mobile_width = 800;

		if(width <= mobile_width && !this.state.mobile)
		{
			this.setState({
				mobile: true,
			});
		}
		else if(width > mobile_width && this.state.mobile)
		{
			this.setState({
				mobile: false,
			});
		}
	}

	handleScroll(e)
	{
		//console.log(window.scrollY);
		e.preventDefault();
	}
}
