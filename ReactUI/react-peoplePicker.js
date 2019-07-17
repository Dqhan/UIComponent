import ReactWidget from './react-widget';

class PeoplePicker extends ReactWidget {
    constructor(props) {
        super(props);
        this.element = {};
        this.state = {
            dialogStatus: false,
            columns: [
                {
                    name: 'User Id',
                    width: '200px'
                },
                {
                    name: 'User Name',
                    width: '200px'
                },
                {
                    name: 'Age',
                    width: '200px'
                },
                {
                    name: 'Sex',
                    width: '200px'
                },
            ],
            selectedItems: []
        };
        this.unique = {};
    }

    componentDidMount() {
        this.element = new aui.PeoplePicker({
            element: ReactDOM.findDOMNode(this),
            items: this.props.items,
            selectedItem: this.props.selectedItem
        });
        $(ReactDOM.findDOMNode(this)).on('openPopup', this.openPopupHandler.bind(this));
    }


    componentWillReceiveProps(newProps) {
        this.element.setOptions(
            {
                items: newProps.items,
                selectedItem: newProps.selectedItem
            }
        );
    }

    dialogCloseHandler() {
        this.setState({
            dialogStatus: false
        })
    }

    openPopupHandler() {
        this.setState({
            dialogStatus: true
        })
    }

    deleteItemHandler(e, args) {
        this.state.selectedItems = args.items;
        for (var key in this.unique) {
            delete this.unique[key];
        }
        this.state.selectedItems.forEach(s => {
            if (!this.unique[s.name]) {
                this.unique[s.name] = true;
            } else {
                this.unique[s.name] = false;
            }
        })
    }


    rowDataChangedHandler(e, args) {
        var action = args.actionType,
            data = args.data;
        switch (action) {
            case "click":
                this.rowClickHandler(data);
                break;
            default:
                break;
        }
    }

    rowClickHandler(data) {
        var userName = data.name;
        if (!this.unique[userName]) {
            this.state.selectedItems.push(data);
            this.unique[userName] = true;
        };
        this.setState(this.state);
    }

    render() {
        return <div>
            <$$.Dialog
                title="PeoplePicker"
                width={600}
                height={500}
                status={this.state.dialogStatus}
                foot={[
                    {
                        text: 'close',
                        click: this.dialogCloseHandler.bind(this)
                    }
                ]}
            >
                <$$.Table
                    columns={this.state.columns}
                    items={this.props.items}
                    rowTempate={RowTempate}
                    rowDataChanged={this.rowDataChangedHandler.bind(this)}
                />
                <$$.TextArea
                    selectedItems={this.state.selectedItems}
                    deleteItemHandler={this.deleteItemHandler.bind(this)}
                />
            </$$.Dialog>
        </div>
    }
}

class RowTempate extends $$.DataGridRow {
    constructor(props) {
        super(props);
    }

    handleBtnClickHandler(data, e) {
        this.trigger('rowDataChanged', e, {
            actionType: "click",
            data: {
                id: data.userId,
                name: data.name
            }
        });
    }

    render() {
        var data = this.props.rowDate;
        return <div role="table-body-row" data-part="row" onClick={this.handleBtnClickHandler.bind(this, data)}>
            <div data-part="cell">{data.userId}</div>
            <div data-part="cell">{data.name}</div>
            <div data-part="cell">{data.age}</div>
            <div data-part="cell">{data.sex}</div>
        </div>
    }
};
window.$$.PeoplePicker = PeoplePicker;