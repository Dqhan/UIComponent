import ReactWidget from './react-widget';
class Combobox extends ReactWidget {
    constructor(props) {
        super(props);
        this.element = {};
    }

    componentWillReceiveProps(newPorps) {
        this.element.setOptions({

        })
    }

    componentDidMount() {
        this.element = new Combobox({
            root: $(React.findDOMNode(this))
        })
    }

    render() {
        return <div></div>
    }
}

window.$$.Combobox = Combobox;