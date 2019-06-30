import ReactWidget from '../react-widget';

class MessageBar extends ReactWidget {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.element = new aui.MessageBar({
            element: ReactDOM.findDOMNode(this),
            type: this.props.type,
            msg: this.props.msg,
            show: this.props.show
        });
    }


    componentWillReceiveProps(newProps) {
        this.element.setOptions({
            type: newProps.type,
            msg: newProps.msg,
            show: newProps.show
        })
    }

    render() {
        return <div></div>
    }
}

window.$$.MessageBar = MessageBar;