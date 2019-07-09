import ReactWidget from '../react-widget';

class Table extends ReactWidget {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.element = new aui.Table({
            element: ReactDOM.findDOMNode(this),
            columns: this.props.columns,
            items: this.props.items,
            rowTempate: this.props.rowTempate
        });
    }


    getRows() {
        var
            len = this.props.items.length,
            rows = [],
            i = 0;
        for (; i < len; i++) {
            rows.push(
                <this.props.rowTempate

                />
            )
        }
        return rows;
    }

    componentWillReceiveProps(newProps) {
        this.element.setOptions({
            columns: newProps.columns,
            items: newProps.items
        })
    }

    render() {
        return <div></div>
    }
}

window.$$.Table = Table;