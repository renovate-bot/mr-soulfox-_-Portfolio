import {ConfigTranslationRoute} from './configTranslation';
import {ConfigAboutRoute} from './configAbout';
import {ConfigCurriculumRoute} from './configCurriculum';
import {ConfigTokensRoute} from './configTokens';
import {ConfigGeneralModifierRoute} from './configGeneralModifier';
import {ConfigDetailsRoute} from './configDetails';

export const configServiceList = [
	{
		method: 'POST',
		path: '/translations/config',
		operation: new ConfigTranslationRoute().translation,
	},
	{
		method: 'POST',
		path: '/about/config',
		operation: new ConfigAboutRoute().modify,
	},
	{
		method: 'POST',
		path: '/curriculum/config',
		operation: new ConfigCurriculumRoute().curriculum,
	},
	{
		method: 'POST',
		path: '/token/config',
		operation: new ConfigTokensRoute().token,
	},
	{
		method: 'POST',
		path: '/config/modifier',
		operation: new ConfigGeneralModifierRoute().modify,
	},
	{
		method: 'GET',
		path: '/config',
		operation: new ConfigDetailsRoute().details,
	},
];
