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
        }
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
        var items = args.selectedItems;
    }


    rowDataChangedHandler(e, args) {
        var action = args.actionType;
        switch (action) {
            case "click":
                console.log(args);
                break;
            default:
                break;
        }
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

class RowTempate extends React.Component {
    constructor(props) {
        super(props);
        this.handleBtnClickHandler = this.handleBtnClickHandler.bind(this);
    }

    handleBtnClickHandler(e) {
        this.trigger('rowDataChanged', e, {
            actionType: "click"
        });
    }

    render() {
        var data = this.props.rowDate;
        return <div role="table-body-row" data-part="row" onClick={this.handleBtnClickHandler}>
            <div data-part="cell">{data.userId}</div>
            <div data-part="cell">{data.name}</div>
            <div data-part="cell">{data.age}</div>
            <div data-part="cell">{data.sex}</div>
        </div>
    }
};
window.$$.PeoplePicker = PeoplePicker;