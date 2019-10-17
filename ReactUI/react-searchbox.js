const handlers = [
    'handleInputChanged',
    'handleBtnClick'
]

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
        handlers.forEach(handler => {
            this[handler] = this[handler].bind(this);
        })
    }

    handleInputChanged(e) {
        this.setState(Object.assign({
            value: e.target.value
        }))
    }

    handleBtnClick(e) {
        this.props.handleSearchChanged(this.element, $$.Event({
            element: this.element,
            newValue: this.state.value
        }))
    }

    render() {
        return <div className='ui-searchbox'>
            <input type='text' value={this.state.value} onChange={this.handleInputChanged} />
            <button onClick={this.handleBtnClick}>Search</button>
        </div>
    }
}

$$.Searchbox = Searchbox;