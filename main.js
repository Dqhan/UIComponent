class Main extends React.Component {
    constructor(props) {
        super(props);
        this.initState().setBind();
    }

    initState() {
        this.state = {
            dialogStatus: true
        }
        return this;
    }

    setBind() {
        this.dialogCloseHandler = this.dialogCloseHandler.bind(this);
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

    render() {
        return <div>
            {/* <div id='banner'></div> */}
            <$$.Dialog
                id={'dialog' + new Date().getTime()}
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
        </div>
    }
}

export default Main;