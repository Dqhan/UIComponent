class ReactWidget extends React.Component {
    constructor(props) {
        super(props);
        this.ReactWidgetFn = this.createObjectFn();
    }


    componentDidMount() {
    }

    createObjectFn() {
        function ReactWidget() {
        }

        ReactWidget.prototype = Object.create(Array.prototype, {
            constructor: ReactWidget,

        });
        return new ReactWidget();
    }

}


export default ReactWidget;