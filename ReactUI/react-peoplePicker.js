import ReactWidget from './react-widget';
import { parse } from 'querystring';

const handelrs = [
    'popUpRichComboboxSelectionChanged',
    'peoplePickerComboboxChanged',
    'handlePeoplePickerClick'
];

class PeoplePicker extends ReactWidget {
    constructor(props) {
        super(props);
        this.element = {};
        this.state = {
            type: this.props.type || 'single',
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
            items: [],
            selectedItems: this.props.selectedItems || []
        };
        // this.unique = {};
        this.initBind();
    }

    initBind() {
        handelrs.forEach(handler => {
            this[handler] = this[handler].bind(this);
        })
    }

    componentDidMount() {
        // this.element = new ui.PeoplePicker({
        //     element: ReactDOM.findDOMNode(this),
        //     type: this.state.type,
        //     items: this.state.items,
        //     selectedItems: this.state.selectedItems
        // });
        // $(ReactDOM.findDOMNode(this)).on('openPopup', this.openPopupHandler.bind(this));
        this.retrieveUser();
    }

    handlePeoplePickerClick() {
        this.setState(Object.assign(this.state, {
            dialogStatus: true
        }))
    }

    retrieveUser() {
        var url = "./peoplepickerdata.json";
        fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
            credentials: 'include'
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                this.setState(Object.assign(this.state, {
                    items: res.userInfo
                }), () => {
                    this.popUpRichComboboxRef.handleSetSelectedItems(this.state.selectedItems);
                });
            })
            .catch(e => {
                console.log(e);
            })
    }

    componentWillReceiveProps(newProps) {
        this.state.selectedItems = newProps.selectedItems;
        // this.element.setOptions(
        //     {
        //         selectedItems: newProps.selectedItems
        //     }
        // );
    }

    dialogCloseHandler() {
        this.setState({
            dialogStatus: false
        })
    }

    dialogAddHandler() {
        this.setState({
            dialogStatus: false
        }, () => {
            this.richComboboxRef.handleSetSelectedItems(this.state.selectedItems);
            // R.scopeEvents.fire('handleSetSelectedItems', this.state.selectedItems);
        })
    }

    openPopupHandler() {
        this.setState({
            dialogStatus: true
        })
    }

    deleteItemHandler(e, args) {
        this.state.selectedItems = args.items;
        // for (var key in this.unique) {
        //     delete this.unique[key];
        // }
        // this.state.selectedItems.forEach(s => {
        //     if (!this.unique[s.name]) {
        //         this.unique[s.name] = true;
        //     } else {
        //         this.unique[s.name] = false;
        //     }
        // })
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
        if (this.state.type == 'single') {
            this.setState({
                selectedItems: [].concat([data])
            })
            return;
        }
        var userName = data.name;
        // if (!this.unique[userName]) {
        //     this.state.selectedItems.push(data);
        //     this.unique[userName] = true;
        // };
        this.state.selectedItems.push(data);
        this.setState({
            selectedItems: this.state.selectedItems
        }, () => {
            this.popUpRichComboboxRef.handleSetSelectedItems(this.state.selectedItems);
        })
    }

    popUpRichComboboxSelectionChanged(e, args) {
        this.state.selectedItems = args.newValue;
    }

    peoplePickerComboboxChanged(e, args) {
        this.state.selectedItems = args.newValue;
    }

    render() {
        return <div>
            <div className="ui-people-picker">
                <R.RichCombobox
                    ref={node => { this.richComboboxRef = node }}
                    width="570px"
                    height="40px"
                    isDropdown="false"
                    isInput="true"
                    items={this.state.items}
                    selectionChanged={this.peoplePickerComboboxChanged.bind(this)}
                />
                <div className="ui-people-picker-container-icon fi-page-user-a" onClick={this.handlePeoplePickerClick}></div>
            </div>
            <$$.Dialog
                title="PeoplePicker"
                width={1000}
                height={650}
                status={this.state.dialogStatus}
                foot={[
                    {
                        text: 'Add',
                        click: this.dialogAddHandler.bind(this)
                    },
                    {
                        text: 'Close',
                        click: this.dialogCloseHandler.bind(this)
                    }
                ]}
            >
                <$$.Datagrid
                    columns={this.state.columns}
                    items={this.state.items}
                    rowTempate={RowTempate}
                    rowDataChanged={this.rowDataChangedHandler.bind(this)}
                />
                <div className='ui-people-picker-richcombobox'>
                    <R.RichCombobox
                        ref={node => { this.popUpRichComboboxRef = node }}
                        width="100%"
                        height="130px"
                        isDropdown="false"
                        isInput="false"
                        items={this.state.items}
                        selectionChanged={this.popUpRichComboboxSelectionChanged.bind(this)}
                    />
                </div>
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
                id: data.id,
                name: data.name
            }
        });
    }

    render() {
        var data = this.props.rowDate;
        return <div role="table-body-row" data-part="row" onClick={this.handleBtnClickHandler.bind(this, data)}>
            <div data-part="cell">{data.id}</div>
            <div data-part="cell">{data.name}</div>
            <div data-part="cell">{data.age}</div>
            <div data-part="cell">{data.sex}</div>
        </div>
    }
};
window.$$.PeoplePicker = PeoplePicker;