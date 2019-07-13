import ReactWidget from './react-widget';

class Pager extends ReactWidget {
    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(newProps) {
        //this.element.setOptions({
        //    items: newProps.items,
        //    selectedIndex: newProps.selectedIndex
        //});
    }

    componentDidMount() {
        this.element = new aui.Pager({
            element: ReactDOM.findDOMNode(this),
            size: this.props.pageSize,
            count: this.props.pageCount,
            selectedIndex: this.props.selectedPage
        });
        $(ReactDOM.findDOMNode(this)).on('selectedPageChanged', this.props.selectedPageChanged.bind(this));
    }

    render() {
        return <div>
        </div>
    }
}

window.$$.Pager = Pager;