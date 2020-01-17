import ReactWidget from "./react-widget";

class Pager extends ReactWidget {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    this.element.setOptions({
      size: newProps.pageSize,
      count: newProps.pageCount,
      selectedIndex: newProps.selectedPage
    });
  }

  componentDidMount() {
    this.element = new ui.Pager({
      element: ReactDOM.findDOMNode(this),
      size: this.props.pageSize,
      count: this.props.pageCount,
      selectedIndex: this.props.selectedPage
    });
    $(ReactDOM.findDOMNode(this)).on(
      "selectedPageChanged",
      this.selectedPageChanged.bind(this)
    );
  }

  selectedPageChanged(e, args) {
    this.props.selectedPageChanged(e, args);
  }

  render() {
    return <div />;
  }
}

window.$$.Pager = Pager;
