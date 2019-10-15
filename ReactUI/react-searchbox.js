class Searchbox extends React.Component {
    constructor(props) {
        super(props);
        this.initState()
            .initBind();
    }

    componentDidMount() {
        this.element = ReactDOM.findDOMNode(this);
    }

    initState() {
        this.state = {
            value: ""
        }
        return this;
    }

    initBind() {
        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }

    handleInputChanged(e) {
        this.setState(Object.assign({
            value: e.target.value
        }))
    }

    handleBtnClick(e) {
        this.props.handleSearchChanged(e, $$.Event({
            element: this.element,
            newValue: this.state.value
        }))
    }

    render() {
        return <div>
            <input type='text' value={this.state.value} onChange={this.handleInputChanged} />
            <button onClick={this.handleBtnClick}>Search</button>
        </div>
    }
}

$$.Searchbox = Searchbox;