class ReactWidget extends React.Component {
    constructor(props) {
        super(props);
        this.ReactWidgetFn = this.createObjectFn();
    }

    createObjectFn() {
        function ReactWidget() {
            [].constructor.call(this);
        }

        ReactWidget.prototype = Object.create(Array.prototype);

        ReactWidget.prototype = {
            constructor: ReactWidget,
            vDomRender: function (vDom) {
                if (vDom.split) return document.createTextNode(vDom);
                if (vDom.length > 1) {
                    for (var i = 0; i < vDom.length; i++) {
                        var cDom = document.createElement(vDom.type);
                    
                    }
                }
            }
        }

        return new ReactWidget();
    }

}

window.$$ = {};

export default ReactWidget;