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
        this.bindEvent();
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

    bindEvent() {
        var target = $('div[role="table-body-row"]>div[data-part="cell"]');
        target.on('click', this.rowClickHandler.bind(this));
        var form_input = $('div[role="table-body-row"] input');
        form_input.on('click', this.inputChangedHandler.bind(this));
    }

    rowClickHandler() {
        this.props.rowChangedHandler($$.Event({
            element: null,
            oldValue: '',
            newValue: '',
            type: 'click'
        }));
    }

    inputChangedHandler() {
        this.props.rowChangedHandler($$.Event({
            element: null,
            oldValue: '',
            newValue: '',
            type: 'change'
        }));
    }

    getColumns() {
        var
            len = this.props.columns.length,
            columns = [],
            i = 0;
        for (; i < len; i++) {
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