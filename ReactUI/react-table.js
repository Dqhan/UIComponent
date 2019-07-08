import ReactWidget from '../react-widget';

class CTable extends ReactWidget {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.element = new aui.Table({
            element: ReactDOM.findDOMNode(this),
        });
    }


    componentWillReceiveProps(newProps) {
        this.element.setOptions({

        })
    }

    render() {
        return <div></div>
    }
}

window.$$.CTable = CTable;