import ReactWidget from '../react-widget';

class PeoplePicker extends ReactWidget {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       
    }


    componentWillReceiveProps(newProps) {
       
    }

    render() {
        return <React.Fragment>
            <$$.Dialog>
                <div>
                    <input /> 
                </div>
            </$$.Dialog>
        </React.Fragment>
    }
}

window.$$.PeoplePicker = PeoplePicker;