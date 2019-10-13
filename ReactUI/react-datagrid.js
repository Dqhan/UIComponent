import ReactWidget from './react-widget';

class Datagrid extends ReactWidget {
    constructor(props) {
        super(props);
        this.table = {};
    }

    componentDidMount() {
        this.element = new ui.Datagrid({
            element: ReactDOM.findDOMNode(this),
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
    
    render() {
        return <div>
            <div role='table-head-row' data-part="row">
                {this.getColumns()}
            </div>
            {this.getRows()}
        </div>
    }
}

window.$$.Datagrid = Datagrid;