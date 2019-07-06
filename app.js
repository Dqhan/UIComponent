import Main from './main.js';
require('./font/style.css');
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
require('./ReactUI/react-peoplePicker');
ReactDOM.render(
    <Main />,
    document.getElementById('app')
)