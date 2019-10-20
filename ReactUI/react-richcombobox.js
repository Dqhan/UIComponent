import ReactWidget from './react-widget';
class RichCombobox extends ReactWidget {
    constructor(props) {
        super(props);
        this.element = {};
        this.state = {
            items: props.items || []
        };
    }

    componentWillReceiveProps(newPorps) {
        this.state.items = newPorps.items;
        this.element.setOptions(newPorps);
    }

    componentDidMount() {
        this.element = ui.RichCombobox({
            width: this.props.width,
            height: this.props.height,
            isDropdown: this.props.isDropdown,
            isInput: this.props.isInput,
            element: ReactDOM.findDOMNode(this),
            items: this.state.items
        });
        $(ReactDOM.findDOMNode(this)).on('selectionChanged', this.selectionChanged.bind(this));
    }

    selectionChanged(e, args) {
        this.props.selectionChanged(e, args);
    }

    render() {
        return <div></div>
    }
}

window.$$.RichCombobox = RichCombobox;