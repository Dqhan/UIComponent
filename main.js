class Main extends React.Component {
    constructor(props) {
        super(props);
        this.initState().setBind();
    }

    initState() {
        this.state = {
            dialogStatus: false
        }
        return this;
    }

    setBind() {
        this.dialogCloseHandler = this.dialogCloseHandler.bind(this);
        this.dialogShowHandler = this.dialogShowHandler.bind(this);
    }

    componentDidMount() {
        // var banner = new window.banner.Banner({
        //     dom: document.getElementById('banner')
        // });
        // banner.init();
        // banner.render();
    }

    dialogCloseHandler() {
        this.setState({
            dialogStatus: false
        })
    }

    dialogShowHandler() {
        this.setState({
            dialogStatus: true
        })
    }

    render() {
        return <div>
            <section>
                {/* <div id='banner'></div> */}
            </section>
            <section>
                <h4>Dialog</h4>
                <button onClick={this.dialogShowHandler}>Dialog</button>
                <$$.Dialog
                    id={'dqhan-dialog'}
                    width={200}
                    height={300}
                    status={this.state.dialogStatus}
                    foot={[
                        {
                            text: 'close',
                            click: this.dialogCloseHandler
                        }
                    ]}
                >
                    <div>66666</div>
                    <div>66666</div>
                </$$.Dialog>
            </section>
            <section>
                <h4>Combobox</h4>
                <$$.Combobox
                    items={
                        [{
                            name: 'text1',
                            value: 'value1'
                        }, {
                            name: 'text2',
                            value: 'value2'
                        }, {
                            name: 'text3',
                            value: 'value3'
                        }]
                    }
                />
            </section>
        </div>
    }
}

export default Main;