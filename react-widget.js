class ReactWidget extends React.Component {
    constructor() {
        this.ReactWidgetFn = this.createObjectFn();
    }

    createObjectFn() {
        function ReactWidget() {
            [].call(this);
        }

        ReactWidget.prototype = {
            constructor: ReactWidget,
        }

        return new ReactWidget();
    }

}

window.$$$ = {};

export default ReactWidget;