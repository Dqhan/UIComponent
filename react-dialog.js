import ReactWidget from './react-widget';
class Dialog extends ReactWidget {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var element = new aui.Dialog({
            root: $(ReactDOM.findDOMNode(this)),
            width: this.props.width,
            height: this.props.height,
            footFragement: this.props.foot
        });
        element.init().render();
    }

    render() {
        return this.props.status ? <div id={this.props.id || new Date().getTime()}>
            {this.props.children}
        </div> : null
    }
}

window.$$.Dialog = Dialog;