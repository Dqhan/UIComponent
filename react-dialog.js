import ReactWidget from './react-widget';
class Dialog extends ReactWidget {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var element = new aui.Dialog({
            
        });
        element.init();
        element.render();
    }

    render() {
        return <div>
            {
                this.props.children
            }
        </div>
    }
}

window.$$.Dialog = Dialog;
module.export = Dialog;