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
        this.element.setOptions(newPorps);
    }

    componentDidMount() {
        this.element = ui.Combobox({
            element: $(ReactDOM.findDOMNode(this)),
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