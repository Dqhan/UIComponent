class Processer extends R.ReactWidget {
    constructor(props) {
        super(props);
        this.initState();
    }

    initState() {
        this.state = {
            processerValue: this.props.processerValue || 0
        }
    }

    componentDidMount() {
        this.element = new ui.Processer({
            element: ReactDOM.findDOMNode(this),
            processerValue: this.state.processerValue
        })
    }

    componentWillReceiveProps(newProps) {
        this.state.processerValue = newProps.processerValue;
        this.element.setOptions({
            processerValue: this.state.processerValue
        })
    }

    render() {
        return <div></div>
    }
}

R.Processer = Processer;