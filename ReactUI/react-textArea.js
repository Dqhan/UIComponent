import ReactWidget from './react-widget';

class TextArea extends ReactWidget {
    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(newProps) {
        //this.element.setOptions({
        //    items: newProps.items,
        //    selectedIndex: newProps.selectedIndex
        //});
    }

    componentDidMount() {
        this.element = new aui.TextArea({
            element: ReactDOM.findDOMNode(this),
        });
        $(ReactDOM.findDOMNode(this)).on('deleteItemHandler', this.props.deleteItemHandler.bind(this));
    }

    render() {
        return <div className="ui-people-picker-textarea">
        </div>
    }
}

window.$$.TextArea = TextArea;