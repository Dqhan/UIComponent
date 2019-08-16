import ReactWidget from "./react-widget";

class Banner extends ReactWidget {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.banner = new window.banner.Banner({
            id: this.props.id,
            element: ReactDOM.findDOMNode(this),
            banner1: this.props.bannerList[0],
            banner2: this.props.bannerList[1],
            banner3: this.props.bannerList[2]
        });

    }

    componentWillUnmount() {
        this.banner.destory();
    }

    render() {
        return <div />;
    }
}

window.$$.Banner = Banner;
