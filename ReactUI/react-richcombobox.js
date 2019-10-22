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
        $(ReactDOM.findDOMNode(this)).on('handleDeleteeSelectionChanged', this.handleDeleteeSelectionChanged.bind(this));
        // R.scopeEvents.register('handleSetSelectedItems', { "selectedItems": [] }, this.handleSetSelectedItems.bind(this));

    }

    handleDeleteeSelectionChanged(e, args) {
        this.props.selectionChanged(e, args);
    }

    selectionChanged(e, args) {
        this.props.selectionChanged(e, args);
    }

    handleSetSelectedItems(selectedItems) {
        // this.element.setOptions({
        //     items: 
        // });
        this.element.updateSelectedItems(selectedItems);
    }

    render() {
        return <div></div>
    }
}

window.$$.RichCombobox = RichCombobox;