class Main extends React.Component {
    constructor(props) {
        super(props);
        this.initState().setBind();
    }

    initState() {
        this.state = {
            dialogStatus: false,

            selectItem0: null,
            selectItem1: null,

            tabItems: [
                { title: 'tab1' },
                { title: 'tab2' },
                { title: 'tab3' },
            ],
            selectedTabIndex: 0,


            pageSize: 10,
            selectedPage: 1

        }
        return this;
    }

    setBind() {
        this.dialogCloseHandler = this.dialogCloseHandler.bind(this);
        this.dialogShowHandler = this.dialogShowHandler.bind(this);
        this.tabSelectChangedHandler = this.tabSelectChangedHandler.bind(this);
    }

    componentDidMount() {
        // var banner = new window.banner.Banner({
        //     dom: document.getElementById('banner')
        // });
        // banner.init();
        // banner.render();
        var banner = new window.banner.Banner({
            pDom: document.getElementById('demo'),
            dom: document.getElementById('banner')
        });
        banner.init();
        banner.render();

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

    comboboxSelection0Changed(e, args) {
        this.state.selectItem0 = args.newValue;
        if (this.state.selectItem0.value == 'value1') this.state.selectItem1 = {
            name: 'text6',
            value: 'value6'
        }
        if (this.state.selectItem0.value == 'value2') this.state.selectItem1 = {
            name: 'text5',
            value: 'value5'
        }
        if (this.state.selectItem0.value == 'value3') this.state.selectItem1 = {
            name: 'text4',
            value: 'value4'
        }
        this.setState({});
    }

    comboboxSelection1Changed(e, args) {
        console.log(args.newValue);
    }

    showLoadingHandler() {
        $$.loading(true);
    }

    hideLoadingHanlder() {
        $$.loading(false);
    }

    tabSelectChangedHandler(e, args) {
        console.log(args);
    }

    showBanner() {
        $('#demo').css('display', '');
    }

    hideBanner() {
        $('#demo').css('display', 'none');
    }

    pagerChangedHandler(e, args) {
        console.log(args);
    }

    render() {
        return <div>
            <h3 style={{ display: 'inline-block', textAlign: 'center', width: '100%' }}>Dqhan'UI</h3>
            <section>
                <h4>Loading</h4>
                <button style={{ position: 'relative', zIndex: '100000000' }} onClick={this.showLoadingHandler.bind(this)}>show</button>
                <button style={{ position: 'relative', zIndex: '100000000' }} onClick={this.hideLoadingHanlder.bind(this)}>hide</button>
            </section>
            <section>
                <h4>Banner</h4>
                <button onClick={this.showBanner.bind(this)}>show</button>
                <button onClick={this.hideBanner.bind(this)}>hide</button>
                <div id='demo' style={{ display: 'none' }}>
                    <div id='banner'></div>
                </div>
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
                <div style={{ display: 'inline-block' }}>
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
                        selectedItem={this.state.selectItem0}
                        selectionChanged={this.comboboxSelection0Changed.bind(this)}
                    />
                </div>
                <div style={{ display: 'inline-block' }}>
                    <$$.Combobox
                        items={
                            [{
                                name: 'text4',
                                value: 'value4'
                            }, {
                                name: 'text5',
                                value: 'value5'
                            }, {
                                name: 'text6',
                                value: 'value6'
                            }]
                        }
                        selectedItem={this.state.selectItem1}
                        selectionChanged={this.comboboxSelection1Changed.bind(this)}
                    />
                </div>
            </section>
            <section>
                <h4>TabControl</h4>
                <$$.TabControl
                    items={this.state.tabItems}
                    selectedIndex={this.state.selectedTabIndex}
                    selectChanged={this.tabSelectChangedHandler}
                >
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </$$.TabControl>
            </section>
            <section>
                <h4>Pager</h4>
                <$$.Pager
                    pageSize={this.state.pageSize}
                    pageCount={10}
                    selectedPage={this.state.selectedPage}
                    selectedPageChanged={this.pagerChangedHandler.bind(this)}
                />
            </section>
            <section>
                <h4>MessageBar</h4>

            </section>
            <section>
                <h4>PeoplePicker</h4>

            </section>
            <section>
                <h4>Processer</h4>

            </section>
            <section>
                <h4>Table</h4>

            </section>
            <section>
                <h4>TipMessager</h4>

            </section>
            <section>
                <h4>Validation</h4>

            </section>
        </div>
    }
}

export default Main;