/* eslint-disable no-restricted-globals */
import dayjs from 'dayjs';
import i18n, { changeLanguage } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React from 'react';
import { initReactI18next } from 'react-i18next';

import { i18nConfiguration, webpackBackend } from 'config/i18n';
import { utf8ToBase64 } from 'lib/base64';
import { Font, pdf } from 'lib/pdf';
import PdfConfig, {
	hydrateFromObject,
	CONFIG_CURRENT_VERSION,
	CONFIG_FILE,
} from 'pdf/config';
import RecalendarPdf from 'pdf/recalendar';
import 'config/dayjs';

// eslint-disable-next-line import/no-named-as-default-member
i18n
	.use( webpackBackend )
	.use( LanguageDetector )
	.use( initReactI18next )
	.init( {
		...i18nConfiguration( [ 'pdf', 'config' ] ),
		preload: [ 'en', 'pl', 'es', 'fr', 'de' ],
		react: {
			useSuspense: false,
		},
	} );

function encodeConfig( data ) {
	const dataWithVersion = Object.assign(
		{ version: CONFIG_CURRENT_VERSION },
		data,
	);
	return (
		'data:text/plain;base64,' + utf8ToBase64( JSON.stringify( dataWithVersion ) )
	);
}

// Effectively disables hyphenation
function hyphenationCallback( word ) {
	return [ word ];
}

self.onmessage = ( { data } ) => {
	const config = new PdfConfig();
	Object.assign( config, hydrateFromObject( data ) );

	const { firstDayOfWeek, language, isPreview } = data;

	changeLanguage( language );

	require( `dayjs/locale/${language}.js` );
	dayjs.locale( language );
	dayjs.updateLocale( language, {
		weekStart: firstDayOfWeek,
	} );

	Font.registerHyphenationCallback( hyphenationCallback );
	Font.register( config.fontDefinition );

	const document = React.createElement(
		RecalendarPdf,
		{ isPreview, config },
		null,
	);
	pdf( document, {
		attachments: [
			{
				src: encodeConfig( data ),
				options: {
					name: CONFIG_FILE,
					type: 'application/json',
					hidden: false,
				},
			},
		],
	} )
		.toBlob()
		.then( ( blob ) => {
			self.postMessage( { blob } );
		} );
};
