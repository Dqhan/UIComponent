import ReactWidget from './react-widget';

class RichText extends ReactWidget {
    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(newProps) {
        this.element.setOptions({
            items: newProps.selectedItems
        });
    }

    componentDidMount() {
        this.element = new ui.RichText({
            element: ReactDOM.findDOMNode(this),
            items: this.props.selectedItems
        });
        $(ReactDOM.findDOMNode(this)).on('deleteItemHandler', this.props.deleteItemHandler.bind(this));
    }

    render() {
        return <div className="ui-people-picker-rich-text">
        </div>
    }
}

window.$$.RichText = RichText;