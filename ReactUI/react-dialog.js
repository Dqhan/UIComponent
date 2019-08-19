import ReactWidget from './react-widget';
class Dialog extends ReactWidget {
    constructor(props) {
        super(props);
        this.state = {};
        this.element = {};
    }

    componentWillReceiveProps(newProps) {
        this.element.setOptions({
            title: this.props.title,
            width: this.props.width,
            height: this.props.height,
            status: newProps.status
        });
    }

    componentDidMount() {
        this.element = new aui.Dialog({
            element: $(ReactDOM.findDOMNode(this)),
            title: this.props.title,
            width: this.props.width,
            height: this.props.height,
            footFragement: this.props.foot
        });
        var i = 0;
        for (; i < this.props.foot.length; i++) {
            $(ReactDOM.findDOMNode(this)).on('btnClick', this.props.foot[0].click)
        };
    }

    render() {
        return <div id={this.props.id || 'dialog-default-id'}>
            {this.props.children}
        </div>
    }
}

window.$$.Dialog = Dialog;