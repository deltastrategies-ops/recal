
function generateFontDefinition( font, cjk = false ) {
	const fontPath = `/fonts/${font}/${font}`;
	const variants = [
		{ src: `${fontPath}-Regular.ttf` },
		{ src: `${fontPath}-Bold.ttf`, fontWeight: 700 },

		// Remove bold/bolditalic fonts for CJK fonts which don't have it.
		!cjk ? { src: `${fontPath}-Italic.ttf`, fontStyle: 'italic' } : undefined,
		!cjk ? {
			src: `${fontPath}-BoldItalic.ttf`,
			fontStyle: 'italic',
			fontWeight: 700,
		} : undefined,
	].filter(v => v != undefined);

	return {
		[ font ]: {
			family: font,
			fonts: variants,
		},
	};
}

const ARIMO = 'Arimo';
export const LATO = 'Lato';
const MONTSERRAT = 'Montserrat';
const SOURCE_SERIF_PRO = 'SourceSerifPro';
const NOTO_SERIF_JP = 'NotoSerifJP'
const NOTO_SANS_JP = 'NotoSansJP'
export const AVAILABLE_FONTS = [ ARIMO, LATO, MONTSERRAT, SOURCE_SERIF_PRO, NOTO_SERIF_JP, NOTO_SANS_JP ];

const FONT_DEFINITIONS = {
	...generateFontDefinition( ARIMO ),
	...generateFontDefinition( LATO ),
	...generateFontDefinition( MONTSERRAT ),
	...generateFontDefinition( SOURCE_SERIF_PRO ),
	...generateFontDefinition( NOTO_SERIF_JP, true ),
	...generateFontDefinition( NOTO_SANS_JP, true )
};

export function getFontDefinition( font ) {
	return FONT_DEFINITIONS[ font ] || FONT_DEFINITIONS[ LATO ];
}
