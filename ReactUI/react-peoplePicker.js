import ReactWidget from '../react-widget';

class PeoplePicker extends ReactWidget {
    constructor(props) {
        super(props);
        this.element = {};
        this.state = {
            dialogStatus: false
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

    openPopupHandler(){
        this.setState({
            dialogStatus: true
        })
    }

    render() {
        return <div>
            <$$.Dialog
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
                <div>66666</div>
                <div>66666</div>
            </$$.Dialog>
        </div>
    }
}

window.$$.PeoplePicker = PeoplePicker;