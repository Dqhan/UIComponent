import ReactWidget from './react-widget';
class Combobox extends ReactWidget {
    constructor(props) {
        super(props);
        this.element = {};
        this.state = {
            items: []
        };
    }

    componentWillReceiveProps(newPorps) {
        if (newPorps.items.length !== 0)
            this.element.setOptions('setItems', {
                items: newPorps.items
            })
        if (newPorps.selectItem != null)
            this.element.setOptions('setSelectedItem', {
                selectedItem: newPorps.selectedItem
            })
    }

    componentDidMount() {
        this.element = new aui.Combobox({
            root: $(ReactDOM.findDOMNode(this)),
            items: this.props.items
        });
        $(ReactDOM.findDOMNode(this)).on('selectionChanged', this.selectionChangedHandler.bind(this));
    }

    selectionChangedHandler(e, args) {
        this.props.selectionChanged(e, args);
    }

    render() {
        return <div></div>
    }
}

window.$$.Combobox = Combobox;