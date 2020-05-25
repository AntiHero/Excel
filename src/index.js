import './scss/style.scss';
import {Excel} from './components/Excel/Excel';
import {Header} from './components/Header/Header';
import {Toolbar} from './components/Toolbar/Toolbar';
import {Formula} from './components/Formula/Formula';
import {Table} from './components/Table/Table';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
});

excel.render();
