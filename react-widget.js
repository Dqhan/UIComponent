class ReactWidget extends React.Component {
    constructor(props) {
        super(props);
        this.ReactWidgetFn = this.createObjectFn();
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

window.$$ = {};

export default ReactWidget;