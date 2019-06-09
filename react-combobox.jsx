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
    }

    componentDidMount() {
        this.element = new aui.Combobox({
            root: $(ReactDOM.findDOMNode(this)),
            items: this.props.items
        })
    }

    render() {
        return <div></div>
    }
}

window.$$.Combobox = Combobox;