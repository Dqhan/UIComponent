import ReactWidget from './react-widget';
class Dialog extends ReactWidget {
    constructor() {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var element = $$.Dialog();
    }

    render() {
        return <div>
            {
                this.props.children
            }
        </div>
    }
}

window.$$$.Dialog = Dialog;

export default Dialog;