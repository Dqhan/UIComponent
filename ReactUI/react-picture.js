import ReactWidget from "./react-widget";
class Picture extends ReactWidget {
    constructor(props) {
        super(props);
        this.state = {};
        this.element = {};
    }

    componentWillReceiveProps(newProps) {
        this.element.setOptions({
            title: newProps.title,
            width: newProps.width,
            height: newProps.height,
            status: newProps.status,
            src: newProps.pictureSrc,
            name: newProps.pictureName
        });
    }

    componentDidMount() {
        this.element = new ui.Picture({
            element: $(ReactDOM.findDOMNode(this)),
            title: this.props.title,
            width: this.props.width,
            height: this.props.height,
            status: this.props.status,
            src: this.props.pictureSrc,
            name: this.props.pictureName
        });
        $(ReactDOM.findDOMNode(this)).on('closeBtnClick', this.props.handleCloseBtn);
        $(ReactDOM.findDOMNode(this)).on('leftBtnClick', this.props.handleLeftBtn);
        $(ReactDOM.findDOMNode(this)).on('rightBtnClick', this.props.handleRightBtn);
    }

    render() {
        return <div id={this.props.id}></div>
    }
}

window.$$.Picture = Picture;
