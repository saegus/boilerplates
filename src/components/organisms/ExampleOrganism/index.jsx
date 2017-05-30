import Inferno from 'inferno';

import ExampleButton from 'components/atoms/ExampleButton';

import './style.scss';

export default ({
  activePage,
  pages,
  onPage,
}) =>
  <div className="ExampleOrganism">
    {pages.map(page => <div
      className={[
        // This is one way to write multiple dynamic classes
        // You could also go with className={`ClassName ${prop ? 'ClassName--variant' : ''} ...`}
        'ExampleOrganism__tab',
        activePage.id === page.id ? 'ExampleOrganism__tab--active' : '',
      ].join(' ')}
    >
      <ExampleButton type="button" onClick={() => onPage(page)}>
        {page.label}
      </ExampleButton>
    </div>)}
  </div>
;
