import ReactWidget from './react-widget';
class Dialog extends ReactWidget {
    constructor(props) {
        super(props);
        this.state = {};
        this.element = {};
    }

    componentWillReceiveProps(newProps) {
        this.element.setOptions({
            width: this.props.width,
            height: this.props.height,
            status: newProps.status
        });
    }

    componentDidMount() {
        this.element = new aui.Dialog({
            root: $(ReactDOM.findDOMNode(this)),
            width: this.props.width,
            height: this.props.height,
            footFragement: this.props.foot
        });
        this.element.init().render();
    }

    render() {
        return <div id={this.props.id || 'dialog-default-id'}>
            {this.props.children}
        </div>
    }
}

window.$$.Dialog = Dialog;