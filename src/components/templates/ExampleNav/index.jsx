import Inferno from 'inferno';

import { setLanguage, getLanguage } from 'utils/Translations';

import ExampleOrganism from 'components/organisms/ExampleOrganism';
import ExampleButton from 'components/atoms/ExampleButton';

import './style.scss';

export default ({
  activePage,
  pages,
  onPage,
}) =>
  <div className="ExampleNav">
    <div className="ExampleNav__label">Navigation</div>
    <div className="ExampleNav__lang">
      <ExampleButton className={getLanguage() === 'fr' ? 'ExampleNav__lang--active' : ''} onClick={() => setLanguage('fr')}>Français</ExampleButton>
      <ExampleButton className={getLanguage() === 'en' ? 'ExampleNav__lang--active' : ''} onClick={() => setLanguage('en')}>English</ExampleButton>
    </div>
    <ExampleOrganism activePage={activePage} pages={pages} onPage={onPage} />
  </div>
;
