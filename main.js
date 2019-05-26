class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var banner = new window.banner.Banner({
            dom: document.getElementById('banner')
        });
        banner.init();
        banner.render();
    }

    render() {
        return <div>
            <div id='banner'></div>
        </div>
    }
}

export default Main;