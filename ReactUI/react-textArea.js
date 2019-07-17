import ReactWidget from './react-widget';

class TextArea extends ReactWidget {
    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(newProps) {
        this.element.setOptions({
            items: newProps.selectedItems
        });
    }

    componentDidMount() {
        this.element = new aui.TextArea({
            element: ReactDOM.findDOMNode(this),
            items: this.props.selectedItems
        });
        $(ReactDOM.findDOMNode(this)).on('deleteItemHandler', this.props.deleteItemHandler.bind(this));
    }

    render() {
        return <div className="ui-people-picker-textarea">
        </div>
    }
}

window.$$.TextArea = TextArea;