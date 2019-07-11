class DataGridRow extends $$.Table {
    constructor(props) {
        super(props);
    }

    trigger(type, args) {
        var self = this;
        $$.trigger(type, self.Table, $$.Event({
            actionType: args.actionType
        }));
    }
}


window.$$.DataGridRow = DataGridRow;