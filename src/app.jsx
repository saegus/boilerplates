import Inferno from 'inferno';
import App from 'components/pages/App';

import EN_1 from 'translations/page1.en.json';
import FR_1 from 'translations/page1.fr.json';
import EN_2 from 'translations/page2.en.json';
import FR_2 from 'translations/page2.fr.json';
import { getLanguage, use } from 'utils/Translations';

import 'assets/fonts/roboto/regular.ttf';
import 'assets/fonts/roboto/bold.ttf';
import 'scss/fonts.scss';

import './index.html';

if (getLanguage() === 'en') [EN_1, EN_2].map(use);
else [FR_1, FR_2].map(use);

Inferno.render(<App />, document.getElementById('root')); // eslint-disable-line
