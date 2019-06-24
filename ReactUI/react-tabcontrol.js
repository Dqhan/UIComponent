import ReactWidget from '../react-widget';

class TabControl extends ReactWidget {
    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(newProps) {
        this.element.setOptions({
            items: newProps.items,
            selectedIndex: newProps.selectedIndex
        });
    }

    componentDidMount() {
        this.element = new aui.TabControl({
            element: ReactDOM.findDOMNode(this),
            items: this.props.items,
            selectedIndex: this.props.selectedIndex
        });
        $(ReactDOM.findDOMNode(this)).on('tabHandleChanged', this.props.selectChanged.bind(this));
    }

    render() {
        return <div>
            <div className='ui-tabcontrol-content'>
                {this.props.children}
            </div>
        </div>
    }
}

window.$$.TabControl = TabControl;