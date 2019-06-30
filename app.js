import Main from './main.js';
require('./aui.less');
require('./widget-core');
require('./widget');
require('./react-widget');
require('./react-dialog');
require('./react-combobox');
require('./banner');
require('./ReactUI/react-pager');
require('./ReactUI/react-tabcontrol');
require('./ReactUI/react-messagerBar');
ReactDOM.render(
    <Main />,
    document.getElementById('app')
)