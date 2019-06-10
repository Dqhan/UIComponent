import Main from './main.js';
require('./widget-core');
require('./widget');
require('./react-widget');
require('./react-dialog');
require('./react-combobox');
// require('./banner');
require('./aui.less');
// require('./banner.css');
ReactDOM.render(
    <Main />,
    document.getElementById('app')
)