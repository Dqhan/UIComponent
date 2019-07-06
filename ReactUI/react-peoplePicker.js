import ReactWidget from '../react-widget';

class PeoplePicker extends ReactWidget {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.element = new aui.PeoplePicker({
            element: ReactDOM.findDOMNode(this),
            items: this.props.items,
            selectedItem: this.props.selectedItem
        });
    }


    componentWillReceiveProps(newProps) {
        this.element.setOptions(
            {
                items: newProps.items,
                selectedItem: newProps.selectedItem
            }
        );
    }

    render() {
        return <div></div>
    }
}

window.$$.PeoplePicker = PeoplePicker;