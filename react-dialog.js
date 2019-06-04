import ReactWidget from './react-widget';
class Dialog extends ReactWidget {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var element = new aui.Dialog({
            root: $(ReactDOM.findDOMNode(this))
        });
        element.init().render();
    }

    render() {
        return <div id={new Date().getTime()}>
            {this.props.children}
        </div>
    }
}

window.$$.Dialog = Dialog;