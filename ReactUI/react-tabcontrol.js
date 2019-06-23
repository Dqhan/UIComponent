import ReactWidget from './react-widget';

class TabControl extends ReactWidget {
    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(newProps) {
        this.element.setOptions({
            width: this.props.width,
            height: this.props.height,
            status: newProps.status
        });
    }

    componentDidMount() {
        this.element = new aui.TabControl({
            element: this.element,
            items: this.items
        });
    }

    render() {
        return <div>

        </div>
    }
}