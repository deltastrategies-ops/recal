import i18n, { changeLanguage } from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import { withTranslation } from 'react-i18next';

import {
	HOME_PATH,
	CONFIGURATOR_PATH,
	FEATURES_PATH,
	FAQ_PATH,
} from 'lib/paths';

class Navigation extends React.Component {
	state = {
		language: i18n.language,
	};

	componentDidMount() {
		i18n.on( 'languageChanged', this.handleLanguageChange );
	}

	componentWillUnmount() {
		i18n.off( 'languageChanged', this.handleLanguageChange );
	}

	handleLanguageSelection = ( event ) => {
		const newLanguage = event.target.value;
		changeLanguage( newLanguage );
	};

	handleLanguageChange = ( newLanguage ) => {
		this.setState( { language: newLanguage } );
	};

	render() {
		const { t } = this.props;
		return (
			<Navbar bg="dark" variant="dark" expand="md">
				<Container fluid>
					<Navbar.Brand href={ HOME_PATH }>ReCalendar</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto" variant="pills">
							<Nav.Item>
								<Nav.Link href={ HOME_PATH }>{t( 'navigation.home' )}</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link href={ CONFIGURATOR_PATH } active>
									{t( 'navigation.configuration' )}
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link href={ FEATURES_PATH }>
									{t( 'navigation.features' )}
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link href={ FAQ_PATH }>{t( 'navigation.faq' )}</Nav.Link>
							</Nav.Item>
						</Nav>
						<Stack direction="horizontal">
							<Form.Label
								column
								className="text-light me-3"
								htmlFor="languagePicker"
							>
								{t( 'language.label' )}
							</Form.Label>
							<Form.Select
								aria-label={ t( 'language.label' ) }
								className="language-select"
								value={ this.state.language }
								onChange={ this.handleLanguageSelection }
							>
								<option value="en">{t( 'language.english' )}</option>
								<option value="fr">{t( 'language.french' )}</option>
								<option value="es">{t( 'language.spanish' )}</option>
								<option value="pl">{t( 'language.polish' )}</option>
								<option value="no">{t( 'language.norwegian' )}</option>
							</Form.Select>
						</Stack>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}

Navigation.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation( [ 'app' ] )( Navigation );
