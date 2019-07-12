import ReactWidget from '../react-widget';

class Table extends ReactWidget {
    constructor(props) {
        super(props);
        this.table = {};
    }

    componentDidMount() {
        this.element = new aui.Table({
            element: ReactDOM.findDOMNode(this),
            columns: this.props.columns,
            items: this.props.items,
            rowTempate: this.props.rowTempate
        });
        this.table = $(ReactDOM.findDOMNode(this));
        this.table.on('rowDataChanged', this.rowDataChanged.bind(this));
    }

    rowDataChanged(e, args) {
        this.props.rowDataChanged(e, args);
    }

    getRows() {
        var
            len = this.props.items.length,
            rows = [],
            i = 0;
        for (; i < len; i++) {
            rows.push(
                <this.props.rowTempate
                    key={i}
                    rowDate={this.props.items[i]}
                />
            )
        }
        return rows;
    }

    getColumns() {
        var
            len = this.props.columns.length,
            columns = [],
            i = 0;
        for (; i < len; i++) {
            if (this.props.columns[i].template)
                columns.push(<div data-part="cell" key={i} style={{ width: this.props.columns[i].width }}>
                    {this.props.columns[i].template}
                </div>);
            else
                columns.push(<div data-part="cell" key={i} style={{ width: this.props.columns[i].width }}>{this.props.columns[i].name}</div>);
        }
        return columns;
    }

    componentWillReceiveProps(newProps) {
        this.element.setOptions({
            columns: newProps.columns,
            items: newProps.items
        })
    }

    render() {
        return <div>
            <div role='table-head-row' data-part="row">
                {this.getColumns()}
            </div>
            {this.getRows()}
        </div>
    }
}

window.$$.Table = Table;